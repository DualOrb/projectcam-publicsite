const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const ses = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' });
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'nick@nr-designs.ca';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

const corsHeaders = {
    'Access-Control-Allow-Origin': CORS_ORIGIN,
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'OPTIONS,POST',
    'Content-Type': 'application/json'
};

exports.handler = async (event) => {
    console.log('Event:', JSON.stringify(event, null, 2));

    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ message: 'CORS preflight successful' })
        };
    }

    try {
        // Validate HTTP method
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                headers: corsHeaders,
                body: JSON.stringify({ 
                    error: 'Method not allowed',
                    message: 'Only POST requests are supported'
                })
            };
        }

        // Parse request body
        let body;
        try {
            body = JSON.parse(event.body);
        } catch (parseError) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ 
                    error: 'Invalid JSON',
                    message: 'Request body must be valid JSON'
                })
            };
        }

        const { name, email, company, message, subject = 'New Contact Form Submission' } = body;

        // Validate required fields
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ 
                    error: 'Invalid name',
                    message: 'Name is required and must be a non-empty string'
                })
            };
        }

        if (!email || typeof email !== 'string') {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ 
                    error: 'Invalid email',
                    message: 'Email is required and must be a string'
                })
            };
        }

        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ 
                    error: 'Invalid message',
                    message: 'Message is required and must be a non-empty string'
                })
            };
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ 
                    error: 'Invalid email format',
                    message: 'Please provide a valid email address'
                })
            };
        }

        // Prepare email content
        const timestamp = new Date().toISOString();
        const userAgent = event.headers?.['User-Agent'] || 'Unknown';
        const sourceIp = event.requestContext?.identity?.sourceIp || 'Unknown';

        const emailSubject = `[Project Cam] ${subject}`;
        const emailBody = `
New contact form submission received:

Name: ${name.trim()}
Email: ${email.trim()}
Company: ${company ? company.trim() : 'Not provided'}

Message:
${message.trim()}

---
Submission Details:
- Submitted: ${timestamp}
- IP Address: ${sourceIp}
- User Agent: ${userAgent}
- Source: Project Cam Website Contact Form
        `.trim();

        const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Form Submission</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #FF6B35; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #FF6B35; }
        .message-box { background: white; padding: 15px; border-left: 4px solid #FF6B35; margin: 15px 0; }
        .metadata { font-size: 0.9em; color: #666; border-top: 1px solid #ddd; padding-top: 15px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🚀 New Contact Form Submission</h2>
            <p>Project Cam Website</p>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div>${name.trim()}</div>
            </div>
            
            <div class="field">
                <div class="label">Email:</div>
                <div><a href="mailto:${email.trim()}">${email.trim()}</a></div>
            </div>
            
            ${company ? `
            <div class="field">
                <div class="label">Company:</div>
                <div>${company.trim()}</div>
            </div>
            ` : ''}
            
            <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">${message.trim().replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class="metadata">
                <h4>Submission Details</h4>
                <p><strong>Submitted:</strong> ${timestamp}</p>
                <p><strong>IP Address:</strong> ${sourceIp}</p>
                <p><strong>User Agent:</strong> ${userAgent}</p>
                <p><strong>Source:</strong> Project Cam Website Contact Form</p>
            </div>
        </div>
    </div>
</body>
</html>
        `.trim();

        // Send email via SES
        const emailParams = {
            Source: NOTIFICATION_EMAIL,
            Destination: {
                ToAddresses: [NOTIFICATION_EMAIL]
            },
            ReplyToAddresses: [email.trim()],
            Message: {
                Subject: {
                    Data: emailSubject,
                    Charset: 'UTF-8'
                },
                Body: {
                    Text: {
                        Data: emailBody,
                        Charset: 'UTF-8'
                    },
                    Html: {
                        Data: htmlBody,
                        Charset: 'UTF-8'
                    }
                }
            }
        };

        await ses.send(new SendEmailCommand(emailParams));

        console.log('Contact form email sent successfully:', {
            to: NOTIFICATION_EMAIL,
            from: email.trim(),
            name: name.trim()
        });

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ 
                success: true,
                message: 'Thank you for your message! We\'ll get back to you soon.',
                data: {
                    submittedAt: timestamp
                }
            })
        };

    } catch (error) {
        console.error('Contact form error:', error);

        // Handle specific SES errors
        if (error.name === 'MessageRejected') {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ 
                    error: 'Email rejected',
                    message: 'Unable to send email. Please check your email address and try again.'
                })
            };
        }

        if (error.name === 'SendingPausedException') {
            return {
                statusCode: 503,
                headers: corsHeaders,
                body: JSON.stringify({ 
                    error: 'Service temporarily unavailable',
                    message: 'Email service is temporarily unavailable. Please try again later.'
                })
            };
        }

        // Generic error response
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ 
                error: 'Internal server error',
                message: 'Unable to process your message at this time. Please try again later.'
            })
        };
    }
};