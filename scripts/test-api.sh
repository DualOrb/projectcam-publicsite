#!/bin/bash

# Test API endpoints script
set -e

echo "🧪 Testing Project Cam API Endpoints..."

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
if [ "$1" = "local" ]; then
    API_BASE_URL="http://127.0.0.1:3000/api"
    echo -e "${BLUE}Testing LOCAL API: $API_BASE_URL${NC}"
else
    API_BASE_URL="https://api.project-cam.com/api"
    echo -e "${BLUE}Testing PRODUCTION API: $API_BASE_URL${NC}"
fi

echo ""

# Test 1: Health Check (if endpoint exists)
echo -e "${BLUE}🏥 Testing health check...${NC}"
if curl -s -f "$API_BASE_URL/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Health check passed${NC}"
else
    echo -e "${YELLOW}⚠️  Health check endpoint not available (optional)${NC}"
fi

# Test 2: Email Signup - Valid Email
echo -e "${BLUE}📧 Testing email signup with valid email...${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_BASE_URL/subscribe" \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","name":"Test User","source":"api-test"}')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n -1)

if [ "$HTTP_CODE" -eq 201 ] || [ "$HTTP_CODE" -eq 409 ]; then
    echo -e "${GREEN}✅ Email signup test passed (HTTP $HTTP_CODE)${NC}"
    echo "   Response: $(echo $BODY | jq -r '.message' 2>/dev/null || echo $BODY)"
else
    echo -e "${RED}❌ Email signup test failed (HTTP $HTTP_CODE)${NC}"
    echo "   Response: $BODY"
fi

# Test 3: Email Signup - Invalid Email
echo -e "${BLUE}📧 Testing email signup with invalid email...${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_BASE_URL/subscribe" \
    -H "Content-Type: application/json" \
    -d '{"email":"invalid-email","name":"Test User"}')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n -1)

if [ "$HTTP_CODE" -eq 400 ]; then
    echo -e "${GREEN}✅ Invalid email validation test passed (HTTP $HTTP_CODE)${NC}"
    echo "   Response: $(echo $BODY | jq -r '.message' 2>/dev/null || echo $BODY)"
else
    echo -e "${RED}❌ Invalid email validation test failed (HTTP $HTTP_CODE)${NC}"
    echo "   Response: $BODY"
fi

# Test 4: Email Signup - Missing Email
echo -e "${BLUE}📧 Testing email signup with missing email...${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_BASE_URL/subscribe" \
    -H "Content-Type: application/json" \
    -d '{"name":"Test User"}')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n -1)

if [ "$HTTP_CODE" -eq 400 ]; then
    echo -e "${GREEN}✅ Missing email validation test passed (HTTP $HTTP_CODE)${NC}"
    echo "   Response: $(echo $BODY | jq -r '.message' 2>/dev/null || echo $BODY)"
else
    echo -e "${RED}❌ Missing email validation test failed (HTTP $HTTP_CODE)${NC}"
    echo "   Response: $BODY"
fi

# Test 5: CORS Preflight
echo -e "${BLUE}🌐 Testing CORS preflight...${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X OPTIONS "$API_BASE_URL/subscribe" \
    -H "Origin: https://project-cam.com" \
    -H "Access-Control-Request-Method: POST" \
    -H "Access-Control-Request-Headers: Content-Type")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)

if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✅ CORS preflight test passed (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${RED}❌ CORS preflight test failed (HTTP $HTTP_CODE)${NC}"
fi

# Test 6: Contact Form - Valid Submission
echo -e "${BLUE}📧 Testing contact form with valid data...${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_BASE_URL/contact" \
    -H "Content-Type: application/json" \
    -d '{"name":"Test User","email":"test@example.com","company":"Test Corp","message":"This is a test message from the API test script.","subject":"API Test"}')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n -1)

if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✅ Contact form test passed (HTTP $HTTP_CODE)${NC}"
    echo "   Response: $(echo $BODY | jq -r '.message' 2>/dev/null || echo $BODY)"
else
    echo -e "${RED}❌ Contact form test failed (HTTP $HTTP_CODE)${NC}"
    echo "   Response: $BODY"
fi

# Test 7: Contact Form - Invalid Email
echo -e "${BLUE}📧 Testing contact form with invalid email...${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_BASE_URL/contact" \
    -H "Content-Type: application/json" \
    -d '{"name":"Test User","email":"invalid-email","message":"Test message"}')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n -1)

if [ "$HTTP_CODE" -eq 400 ]; then
    echo -e "${GREEN}✅ Contact form invalid email test passed (HTTP $HTTP_CODE)${NC}"
    echo "   Response: $(echo $BODY | jq -r '.message' 2>/dev/null || echo $BODY)"
else
    echo -e "${RED}❌ Contact form invalid email test failed (HTTP $HTTP_CODE)${NC}"
    echo "   Response: $BODY"
fi

# Test 8: Contact Form - Missing Required Fields
echo -e "${BLUE}📧 Testing contact form with missing fields...${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_BASE_URL/contact" \
    -H "Content-Type: application/json" \
    -d '{"name":"Test User"}')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n -1)

if [ "$HTTP_CODE" -eq 400 ]; then
    echo -e "${GREEN}✅ Contact form missing fields test passed (HTTP $HTTP_CODE)${NC}"
    echo "   Response: $(echo $BODY | jq -r '.message' 2>/dev/null || echo $BODY)"
else
    echo -e "${RED}❌ Contact form missing fields test failed (HTTP $HTTP_CODE)${NC}"
    echo "   Response: $BODY"
fi

echo ""
echo -e "${GREEN}🎉 API testing completed!${NC}"