#!/bin/bash

# Simplified deployment script for Project Cam
set -e

echo "🚀 Project Cam Simple Deployment"
echo "=================================="

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Default values
DOMAIN_NAME=${DOMAIN_NAME:-"project-cam.com"}
NOTIFICATION_EMAIL=${NOTIFICATION_EMAIL:-"nick@nr-designs.ca"}
STACK_NAME=${STACK_NAME:-"projectcam-launch-site"}

echo -e "${BLUE}Configuration:${NC}"
echo "  Domain: $DOMAIN_NAME"
echo "  Email: $NOTIFICATION_EMAIL"
echo "  Stack: $STACK_NAME"
echo ""

# Build the site
echo -e "${BLUE}🏗️  Building website...${NC}"
npm run build

# Install lambda dependencies
echo -e "${BLUE}📦 Installing Lambda dependencies...${NC}"
(cd lambda/email-signup && npm install --production)
(cd lambda/contact-form && npm install --production)

# Build and deploy with SAM
echo -e "${BLUE}🚀 Building and deploying with SAM...${NC}"
sam build

sam deploy \
    --stack-name "$STACK_NAME" \
    --region "us-east-1" \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides \
        "Environment=prod" \
        "DomainName=$DOMAIN_NAME" \
        "NotificationEmail=$NOTIFICATION_EMAIL" \
    --no-confirm-changeset

# Get the S3 bucket name and upload files
echo -e "${BLUE}☁️  Uploading website files...${NC}"
S3_BUCKET=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "us-east-1" \
    --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" \
    --output text)

aws s3 sync dist/ s3://$S3_BUCKET --delete

# Get CloudFront distribution and invalidate cache
echo -e "${BLUE}🔄 Invalidating CloudFront cache...${NC}"
CLOUDFRONT_ID=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "us-east-1" \
    --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" \
    --output text)

aws cloudfront create-invalidation \
    --distribution-id "$CLOUDFRONT_ID" \
    --paths "/*" > /dev/null

echo ""
echo -e "${GREEN}🎉 Deployment completed!${NC}"
echo "  Website: https://$DOMAIN_NAME"
echo "  Bucket: $S3_BUCKET"
echo ""
echo -e "${YELLOW}⚠️  Important next steps:${NC}"
echo "  1. Verify $NOTIFICATION_EMAIL in AWS SES"
echo "  2. Update DNS records if needed"
echo "  3. Test contact forms"