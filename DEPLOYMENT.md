# Project Cam Deployment Guide

This guide covers deploying the Project Cam launch website using AWS SAM (Serverless Application Model) with S3, CloudFront, Lambda, and API Gateway.

## Architecture

- **S3**: Static website hosting for React build
- **CloudFront**: CDN with custom domain and SSL
- **Lambda**: Email signup and contact form processing
- **API Gateway**: REST API for form submissions
- **DynamoDB**: Email subscriber storage
- **SES**: Email delivery for contact forms
- **Route 53**: DNS management

## Prerequisites

1. **AWS CLI** configured with appropriate permissions
2. **AWS SAM CLI** installed
3. **Node.js** (v18+) and npm
4. **Domain name** registered and accessible
5. **AWS Account** with necessary service limits

### Required AWS Permissions

Your AWS user/role needs permissions for:
- CloudFormation (full access)
- S3 (create buckets, upload files)
- CloudFront (create distributions)
- Lambda (create functions)
- API Gateway (create APIs)
- DynamoDB (create tables)
- SES (send emails)
- Route 53 (manage DNS)
- ACM (manage certificates)

## Quick Start

### 1. Configure Environment

```bash
# Set your domain and email
export DOMAIN_NAME="your-domain.com"
export NOTIFICATION_EMAIL="your-email@your-domain.com"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Deploy

**Option A: Simple Deploy (Recommended)**
```bash
./scripts/deploy-simple.sh
```

**Option B: Full Deploy with SSL Setup**
```bash
./deploy.sh
```

### 4. Verify Email in SES

1. Go to [AWS SES Console](https://console.aws.amazon.com/ses/)
2. Click "Verified identities"
3. Verify your notification email address
4. If in SES Sandbox, also verify test email addresses

### 5. Test the Deployment

```bash
# Test API endpoints
./scripts/test-api.sh

# Or test specific functionality
curl -X POST https://api.your-domain.com/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

## Configuration Files

### samconfig.toml
Update with your specific values:

```toml
parameter_overrides = [
    "Environment=prod",
    "DomainName=your-domain.com",
    "CertificateArn=arn:aws:acm:us-east-1:ACCOUNT:certificate/CERT_ID",
    "NotificationEmail=contact@your-domain.com"
]
```

### template.yaml
The SAM template defines all AWS resources. Key parameters:
- `DomainName`: Your website domain
- `NotificationEmail`: Where contact forms are sent
- `Environment`: Deployment environment (dev/prod)

## Updating the Site

After making changes to the website:

```bash
# Build the React app
npm run build

# Upload to S3 and invalidate CloudFront
aws s3 sync dist/ s3://$(aws cloudformation describe-stacks \
  --stack-name projectcam-launch-site \
  --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' \
  --output text) --delete

aws cloudfront create-invalidation \
  --distribution-id $(aws cloudformation describe-stacks \
    --stack-name projectcam-launch-site \
    --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' \
    --output text) \
  --paths "/*"
```

Or use the package.json scripts:
```bash
npm run deploy
npm run invalidate
```

## SSL Certificate Setup

### Automatic (via deploy.sh)
The deploy script will automatically:
1. Check for existing certificates
2. Request a new certificate if needed
3. Pause deployment for manual validation
4. Resume after validation

### Manual Setup
1. Go to [AWS Certificate Manager](https://console.aws.amazon.com/acm/)
2. Request a certificate for your domain
3. Add DNS validation records
4. Update `samconfig.toml` with the certificate ARN

## DNS Configuration

After deployment, update your domain's DNS:

1. Get CloudFront domain name from AWS Console
2. Create CNAME or ALIAS records:
   - `your-domain.com` → CloudFront distribution
   - `www.your-domain.com` → CloudFront distribution
   - `api.your-domain.com` → API Gateway (if using custom API domain)

## Troubleshooting

### Common Issues

**Certificate Validation**
- Ensure DNS records are properly set for validation
- Certificate must be in `us-east-1` region for CloudFront

**SES Email Delivery**
- Verify sender email in SES console
- Check SES sending limits and sandbox status
- Ensure proper IAM permissions for Lambda

**CloudFront Caching**
- Changes may take time to propagate
- Use invalidation for immediate updates
- Check cache headers in development

**Lambda Errors**
- Check CloudWatch logs for detailed error messages
- Verify environment variables are set correctly
- Ensure proper IAM permissions

### Debugging Commands

```bash
# Check stack status
aws cloudformation describe-stacks --stack-name projectcam-launch-site

# View Lambda logs
sam logs -n EmailSignupFunction --stack-name projectcam-launch-site --tail

# Test Lambda locally
sam local start-api
./scripts/test-api.sh local

# Validate SAM template
sam validate

# Check S3 bucket contents
aws s3 ls s3://your-bucket-name --recursive
```

### Cleanup

To remove all resources:

```bash
# Delete CloudFormation stack
aws cloudformation delete-stack --stack-name projectcam-launch-site

# Clean up S3 bucket (if needed)
aws s3 rm s3://your-bucket-name --recursive
aws s3 rb s3://your-bucket-name
```

## Security Considerations

- S3 bucket has public access blocked
- CloudFront uses Origin Access Control (OAC)
- Lambda functions have minimal IAM permissions
- API Gateway has CORS configured
- All communications use HTTPS
- Input validation on all form submissions

## Cost Optimization

- CloudFront uses PriceClass_100 (US, Canada, Europe)
- DynamoDB uses on-demand billing
- Lambda functions have appropriate timeouts
- S3 lifecycle policies can be added for log retention

## Monitoring

Consider adding:
- CloudWatch alarms for Lambda errors
- API Gateway access logging
- CloudFront real-time logs
- X-Ray tracing for Lambda functions

## Support

For deployment issues:
1. Check CloudFormation events in AWS Console
2. Review Lambda function logs in CloudWatch
3. Validate template with `sam validate`
4. Test locally with `sam local start-api`