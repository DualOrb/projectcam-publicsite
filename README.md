# Project Cam Launch Website

A stunning, fully-featured launch website for Project Cam built with React, TypeScript, Tailwind CSS, and deployed on AWS using SAM (Serverless Application Model).

## 🚀 Features

- **Modern React Stack**: React 18 + TypeScript + Vite
- **Beautiful UI**: Tailwind CSS with custom orange/black brand theme
- **Smooth Animations**: Framer Motion for engaging user experience
- **Email Signup**: Complete newsletter signup with AWS Lambda backend
- **Responsive Design**: Mobile-first approach with perfect cross-device experience
- **SEO Optimized**: Meta tags, structured data, and performance optimized
- **AWS Infrastructure**: Serverless deployment with S3, CloudFront, and Lambda

## 🎨 Design

### Brand Colors
- **Primary Orange**: `#FF6B35`
- **Primary Black**: `#1A1A1A`
- **Supporting grays**: Various shades for text and backgrounds

### Sections
1. **Hero Section** - Compelling headline with email signup
2. **Features Showcase** - Interactive cards highlighting Project Cam capabilities
3. **Phone Mockups** - Devices showing app interface with rotating galleries
4. **Enterprise Features** - Team management and collaboration highlights
5. **Launch Timeline** - Progress updates and milestones
6. **Footer** - Contact info and social links

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling with custom theme
- **Framer Motion** for animations
- **React Hook Form** for form handling
- **Lucide React** for icons

### Backend (AWS)
- **Lambda Functions** (Node.js) for email processing
- **API Gateway** for REST endpoints
- **DynamoDB** for subscriber storage
- **S3** for static website hosting
- **CloudFront** for global CDN
- **Route 53** for DNS management
- **ACM** for SSL certificates

## 📦 Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd projectcam-publicsite
   npm install
   ```

2. **Install AWS SAM CLI:**
   ```bash
   # macOS
   brew install aws-sam-cli
   
   # Windows
   # Download from: https://aws.amazon.com/serverless/sam/
   ```

3. **Configure AWS CLI:**
   ```bash
   aws configure
   # Enter your AWS Access Key ID, Secret Access Key, and region (us-east-1)
   ```

## 🚀 Development

### Local Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Local API Testing
```bash
# Start local API
sam local start-api

# Test email signup endpoint
curl -X POST http://127.0.0.1:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

## 🌐 Deployment

### Automated Deployment
Run the deployment script:
```bash
./deploy.sh
```

This script will:
1. ✅ Check AWS configuration
2. 🔍 Verify/create Route 53 hosted zone
3. 🔒 Request/verify SSL certificate
4. 🏗️ Build React application
5. 📦 Install Lambda dependencies
6. 🚀 Deploy infrastructure with SAM
7. ☁️ Upload files to S3
8. 🔄 Invalidate CloudFront cache

### Manual Deployment
```bash
# Build the application
npm run build

# Install Lambda dependencies
cd lambda/email-signup && npm install --production && cd ../..

# Deploy with SAM
sam build
sam deploy --guided  # First time only
sam deploy            # Subsequent deployments

# Upload to S3 and invalidate CloudFront
npm run deploy && npm run invalidate
```

### Environment Configuration

Update `samconfig.toml` with your specific values:
```toml
parameter_overrides = [
    "Environment=prod",
    "DomainName=project-cam.com",
    "CertificateArn=arn:aws:acm:us-east-1:ACCOUNT_ID:certificate/CERTIFICATE_ID"
]
```

## 📋 Project Structure

```
projectcam-publicsite/
├── src/                          # React source code
│   ├── components/              # Reusable UI components
│   │   ├── Layout/             # Header, Footer
│   │   ├── Sections/           # Page sections
│   │   └── UI/                 # Base UI components
│   ├── hooks/                  # Custom React hooks
│   ├── pages/                  # Page components
│   ├── types/                  # TypeScript type definitions
│   └── utils/                  # Utility functions
├── lambda/                     # AWS Lambda functions
│   └── email-signup/          # Email subscription handler
├── public/                     # Static assets
├── dist/                       # Built application (generated)
├── template.yaml              # SAM infrastructure template
├── deploy.sh                  # Deployment script
└── README.md                  # This file
```

## 🔧 Configuration

### Environment Variables
```bash
# .env.local (for local development)
VITE_API_URL=http://localhost:3000/api
```

### AWS Resources Created
- **S3 Bucket**: Static website hosting
- **CloudFront Distribution**: Global CDN with custom domain
- **Route 53 Records**: DNS routing for domain
- **Lambda Function**: Email signup processing
- **API Gateway**: REST API endpoints
- **DynamoDB Table**: Email subscriber storage
- **ACM Certificate**: SSL/TLS encryption

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with code splitting
- **Image Optimization**: WebP format with fallbacks
- **Caching**: Aggressive CloudFront caching strategy

## 🔒 Security

- **HTTPS Only**: All traffic encrypted with TLS 1.2+
- **CORS**: Properly configured cross-origin requests
- **Input Validation**: Server-side email validation
- **Rate Limiting**: API Gateway throttling
- **Security Headers**: Implemented via CloudFront

## 📈 Analytics & Monitoring

- **CloudWatch Logs**: Lambda function monitoring
- **CloudWatch Metrics**: API Gateway and CloudFront metrics
- **X-Ray Tracing**: Distributed tracing (optional)

## 🐛 Troubleshooting

### Common Issues

1. **Certificate Validation Pending**
   - Check AWS ACM console for DNS validation records
   - Add CNAME records to your domain's DNS

2. **Build Errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules dist
   npm install
   npm run build
   ```

3. **Deployment Failures**
   ```bash
   # Check SAM logs
   sam logs -n EmailSignupFunction --stack-name projectcam-launch-site
   ```

### Useful Commands
```bash
# Check stack status
aws cloudformation describe-stacks --stack-name projectcam-launch-site

# View Lambda logs
sam logs -n EmailSignupFunction --stack-name projectcam-launch-site --tail

# Test email endpoint
curl -X POST https://api.project-cam.com/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## 📞 Support

For deployment issues or questions:
- Check AWS CloudFormation console for detailed error messages
- Review CloudWatch logs for Lambda function errors
- Ensure all AWS permissions are properly configured

## 🎯 Next Steps

1. **Domain Setup**: Configure DNS settings with your domain registrar
2. **SSL Validation**: Complete certificate validation in AWS ACM
3. **Content Updates**: Add real product screenshots and testimonials
4. **Analytics**: Integrate Google Analytics or AWS analytics
5. **A/B Testing**: Test different conversion optimization strategies

---

**Built with ❤️ for Project Cam** 🚀