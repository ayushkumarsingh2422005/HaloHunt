// Simple test script to verify stream endpoints
// Run with: node test-streams.js

const API_BASE_URL = 'http://localhost:5000';

// Test data
const testStream = {
  title: 'Test Stream',
  description: 'This is a test stream for development',
  hashtags: ['test', 'development', 'streaming'],
  aboutThisStream: 'Testing the stream creation functionality',
  status: 'draft'
};

// Helper function to make requests
async function makeRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.error(`Error making request to ${endpoint}:`, error.message);
    return { status: 500, data: { error: error.message } };
  }
}

// Test functions
async function testHealthCheck() {
  console.log('\n🔍 Testing health check...');
  const result = await makeRequest('/health');
  console.log('Health check result:', result);
}

async function testPublicStreams() {
  console.log('\n🔍 Testing public streams endpoint...');
  const result = await makeRequest('/api/v1/streams');
  console.log('Public streams result:', result);
}

async function testStreamSearch() {
  console.log('\n🔍 Testing stream search...');
  const result = await makeRequest('/api/v1/streams/search?q=test');
  console.log('Stream search result:', result);
}

// Run tests
async function runTests() {
  console.log('🚀 Starting stream API tests...');
  
  await testHealthCheck();
  await testPublicStreams();
  await testStreamSearch();
  
  console.log('\n✅ Tests completed!');
  console.log('\nNote: Protected endpoints (create, update, delete) require authentication.');
  console.log('To test those, you need to:');
  console.log('1. Register/login to get a token');
  console.log('2. Include the token in the Authorization header');
  console.log('3. Test the protected endpoints');
}

// Run the tests
runTests().catch(console.error);
