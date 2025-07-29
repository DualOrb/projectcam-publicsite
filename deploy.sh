#!/bin/bash

# Project Cam Launch Site Deployment Script
set -e

echo "🚀 Starting Project Cam Launch Site Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN_NAME="project-cam.com"
STACK_NAME="projectcam-launch-site"
REGION="us-east-1"

echo -e "${BLUE}📋 Deployment Configuration:${NC}"
echo "  Domain: $DOMAIN_NAME"
echo "  Stack: $STACK_NAME"
echo "  Region: $REGION"
echo ""

# Check if AWS CLI is configured
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo -e "${RED}❌ AWS CLI is not configured or credentials are invalid${NC}"
    echo "Please run 'aws configure' to set up your credentials"
    exit 1
fi

echo -e "${GREEN}✅ AWS CLI configured${NC}"

# Check if domain exists in Route 53
echo -e "${BLUE}🔍 Checking Route 53 hosted zone...${NC}"
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones \
    --query "HostedZones[?Name=='${DOMAIN_NAME}.'].Id" \
    --output text 2>/dev/null | cut -d'/' -f3)

if [ -z "$HOSTED_ZONE_ID" ]; then
    echo -e "${YELLOW}⚠️  Creating hosted zone for $DOMAIN_NAME...${NC}"
    HOSTED_ZONE_ID=$(aws route53 create-hosted-zone \
        --name "$DOMAIN_NAME" \
        --caller-reference "$(date +%s)" \
        --query 'HostedZone.Id' \
        --output text | cut -d'/' -f3)
    echo -e "${GREEN}✅ Created hosted zone: $HOSTED_ZONE_ID${NC}"
else
    echo -e "${GREEN}✅ Found existing hosted zone: $HOSTED_ZONE_ID${NC}"
fi

# Check for existing SSL certificate
echo -e "${BLUE}🔍 Checking for SSL certificate...${NC}"
CERT_ARN=$(aws acm list-certificates \
    --region us-east-1 \
    --query "CertificateSummaryList[?DomainName=='${DOMAIN_NAME}' || contains(SubjectAlternativeNameSummary, '${DOMAIN_NAME}')].CertificateArn" \
    --output text 2>/dev/null)

if [ -z "$CERT_ARN" ]; then
    echo -e "${YELLOW}⚠️  No SSL certificate found. Creating new certificate...${NC}"
    CERT_ARN=$(aws acm request-certificate \
        --domain-name "$DOMAIN_NAME" \
        --subject-alternative-names "www.$DOMAIN_NAME" \
        --validation-method DNS \
        --region us-east-1 \
        --query 'CertificateArn' \
        --output text)
    
    echo -e "${YELLOW}📋 Certificate requested: $CERT_ARN${NC}"
    echo -e "${YELLOW}⚠️  You need to validate the certificate in the AWS Console${NC}"
    echo -e "${YELLOW}   Go to: https://console.aws.amazon.com/acm/home?region=us-east-1${NC}"
    echo ""
    echo -e "${YELLOW}⏸️  Deployment paused. Run this script again after certificate validation.${NC}"
    exit 0
else
    echo -e "${GREEN}✅ Found SSL certificate: $CERT_ARN${NC}"
fi

# Build the React app
echo -e "${BLUE}🏗️  Building React application...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed${NC}"

# Install Lambda dependencies
echo -e "${BLUE}📦 Installing Lambda dependencies...${NC}"
cd lambda/email-signup
npm install --production
cd ../contact-form
npm install --production
cd ../..

# Deploy with SAM
echo -e "${BLUE}🚀 Deploying infrastructure with SAM...${NC}"
sam build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ SAM build failed${NC}"
    exit 1
fi

# Prompt for notification email
read -p "Enter notification email for contact forms (default: contact@$DOMAIN_NAME): " NOTIFICATION_EMAIL
NOTIFICATION_EMAIL=${NOTIFICATION_EMAIL:-"contact@$DOMAIN_NAME"}

sam deploy \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides \
        "Environment=prod" \
        "DomainName=$DOMAIN_NAME" \
        "CertificateArn=$CERT_ARN" \
        "NotificationEmail=$NOTIFICATION_EMAIL" \
    --confirm-changeset

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ SAM deployment failed${NC}"
    exit 1
fi

# Get outputs from CloudFormation
echo -e "${BLUE}📊 Getting deployment outputs...${NC}"
S3_BUCKET=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" \
    --output text)

CLOUDFRONT_DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" \
    --output text)

# Upload built files to S3
echo -e "${BLUE}☁️  Uploading files to S3...${NC}"
aws s3 sync dist/ s3://$S3_BUCKET --delete

# Invalidate CloudFront cache
echo -e "${BLUE}🔄 Invalidating CloudFront cache...${NC}"
aws cloudfront create-invalidation \
    --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
    --paths "/*"

echo ""
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo ""
echo -e "${BLUE}📋 Deployment Summary:${NC}"
echo "  🌐 Website URL: https://$DOMAIN_NAME"
echo "  🪣 S3 Bucket: $S3_BUCKET"
echo "  📡 CloudFront Distribution: $CLOUDFRONT_DISTRIBUTION_ID"
echo "  🎯 API Gateway: https://api.$DOMAIN_NAME"
echo ""
echo -e "${GREEN}✅ Your Project Cam launch site is now live!${NC}"