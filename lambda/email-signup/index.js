const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand } = require('@aws-sdk/lib-dynamodb');

const dynamodb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.SUBSCRIBERS_TABLE;
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

        const { email, name, source } = body;

        // Validate email
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

        const normalizedEmail = email.toLowerCase().trim();
        const timestamp = new Date().toISOString();

        // Check if email already exists
        try {
            const existingSubscriber = await dynamodb.send(new GetCommand({
                TableName: TABLE_NAME,
                Key: { email: normalizedEmail }
            }));

            if (existingSubscriber.Item) {
                return {
                    statusCode: 409,
                    headers: corsHeaders,
                    body: JSON.stringify({ 
                        error: 'Already subscribed',
                        message: 'This email is already subscribed to our mailing list'
                    })
                };
            }
        } catch (getError) {
            console.error('Error checking existing subscriber:', getError);
            // Continue with signup if DynamoDB read fails
        }

        // Create subscriber record
        const subscriber = {
            email: normalizedEmail,
            name: name ? name.trim() : null,
            source: source || 'website',
            createdAt: timestamp,
            updatedAt: timestamp,
            status: 'active',
            ipAddress: event.requestContext?.identity?.sourceIp || null,
            userAgent: event.headers?.['User-Agent'] || null
        };

        // Save to DynamoDB
        await dynamodb.send(new PutCommand({
            TableName: TABLE_NAME,
            Item: subscriber,
            ConditionExpression: 'attribute_not_exists(email)' // Prevent race conditions
        }));

        console.log('Successfully subscribed:', normalizedEmail);

        return {
            statusCode: 201,
            headers: corsHeaders,
            body: JSON.stringify({ 
                success: true,
                message: 'Successfully subscribed to Project Cam updates!',
                data: {
                    email: normalizedEmail,
                    subscribedAt: timestamp
                }
            })
        };

    } catch (error) {
        console.error('Subscription error:', error);

        // Handle specific DynamoDB errors
        if (error.name === 'ConditionalCheckFailedException') {
            return {
                statusCode: 409,
                headers: corsHeaders,
                body: JSON.stringify({ 
                    error: 'Already subscribed',
                    message: 'This email is already subscribed to our mailing list'
                })
            };
        }

        // Generic error response
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ 
                error: 'Internal server error',
                message: 'Unable to process subscription at this time. Please try again later.'
            })
        };
    }
};