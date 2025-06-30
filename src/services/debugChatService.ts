import { api } from './api';

export const debugChatService = {
  async testStartChat() {
    console.log('🔧 Testing different /chat/start/ request formats...');
    
    const testCases = [
      { name: 'Empty object', data: {} },
      { name: 'No body', data: undefined },
      { name: 'With user_id', data: { user_id: 'guest' } },
      { name: 'With empty user_id', data: { user_id: '' } },
    ];

    for (const testCase of testCases) {
      try {
        console.log(`Testing: ${testCase.name}`);
        const response = await api.post('/chat/start/', testCase.data);
        console.log('✅ Success:', response);
        return response;
      } catch (error) {
        console.log(`❌ Failed with ${testCase.name}:`, error);
      }
    }
    
    throw new Error('All /chat/start/ test cases failed');
  },

  async testSendMessage(sessionId: string) {
    console.log('🔧 Testing different /chat/message/ request formats...');
    
    const testCases = [
      { 
        name: 'Standard format', 
        data: { session_id: sessionId, message: 'Hello test' } 
      },
      { 
        name: 'Different field names', 
        data: { sessionId: sessionId, content: 'Hello test' } 
      },
      { 
        name: 'With additional fields', 
        data: { session_id: sessionId, message: 'Hello test', user_id: 'guest' } 
      },
    ];

    for (const testCase of testCases) {
      try {
        console.log(`Testing: ${testCase.name}`);
        const response = await api.post('/chat/message/', testCase.data);
        console.log('✅ Success:', response);
        return response;
      } catch (error) {
        console.log(`❌ Failed with ${testCase.name}:`, error);
      }
    }
    
    throw new Error('All /chat/message/ test cases failed');
  },

  async testEndpoints() {
    console.log('🧪 Running Chat API Debug Tests...');
    
    try {
      // Test start chat
      const startResponse = await this.testStartChat();
      console.log('Chat started with session:', startResponse.id);
      
      // Test send message if we got a session
      if (startResponse?.id) {
        await this.testSendMessage(startResponse.id);
      }
      
      return true;
    } catch (error) {
      console.error('Debug tests failed:', error);
      return false;
    }
  }
};

// Helper to test API connectivity
export async function testAPIConnectivity() {
  console.log('🌐 Testing API connectivity...');
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
  
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    console.log('API Base URL Response:', response.status, response.statusText);
    
    if (response.ok) {
      const data = await response.text();
      console.log('API Response:', data);
    }
    
    return response.ok;
  } catch (error) {
    console.error('API connectivity failed:', error);
    return false;
  }
}