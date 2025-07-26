import dotenv from 'dotenv';
import { TransactionalEmailsApi } from '@getbrevo/brevo';

// Load environment variables
dotenv.config();

// Check if API key exists
const apiKey = process.env.BREVO_API_KEY;
console.log('BREVO_API_KEY available:', !!apiKey);

if (!apiKey) {
  console.error('Error: BREVO_API_KEY is not set in environment variables');
  process.exit(1);
}

// Initialize Brevo API client
const emailAPI = new TransactionalEmailsApi();

// Method 1: Try setting the API key using authentications object
try {
  console.log('Setting API key using authentications object...');
  emailAPI.authentications['api-key'] = {
    apiKey: apiKey,
    apiKeyPrefix: 'api-key'
  };
  console.log('API key set successfully using method 1');
} catch (error) {
  console.error('Error setting API key using method 1:', error);
}

// Method 2: Try setting the API key directly (for older versions)
try {
  console.log('Setting API key directly (fallback method)...');
  emailAPI.authentications.apiKey = { apiKey };
  console.log('API key set successfully using method 2');
} catch (error) {
  console.error('Error setting API key using method 2:', error);
}

// Print the authentication configuration
console.log('Current authentication configuration:');
console.log(JSON.stringify(emailAPI.authentications, null, 2));

console.log('Brevo API client initialized successfully'); 