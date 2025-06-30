import { chatService } from '@/services/chatService';
import { authService } from '@/services/authService';

export async function testChatIntegration() {
  console.log('🧪 Testing Chat API Integration...');
  
  try {
    // Test 1: Check if we can start a chat session
    console.log('1. Testing chat session start...');
    const startResponse = await chatService.startChat();
    console.log('✅ Chat session started:', startResponse.session_id);
    
    // Test 2: Test sending a message
    console.log('2. Testing message sending...');
    const messageResponse = await chatService.sendMessage({
      session_id: startResponse.session_id,
      message: 'Hello, this is a test message'
    });
    console.log('✅ Message sent and received reply:', messageResponse.reply);
    
    // Test 3: Test loading chat history
    console.log('3. Testing chat history...');
    const historyResponse = await chatService.getChatHistory();
    console.log('✅ Chat history loaded:', historyResponse.sessions.length, 'sessions');
    
    // Test 4: Test loading specific session
    console.log('4. Testing session loading...');
    const sessionResponse = await chatService.getChatSession(startResponse.session_id);
    console.log('✅ Session loaded with', sessionResponse.messages.length, 'messages');
    
    console.log('🎉 All chat integration tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ Chat integration test failed:', error);
    
    if (error instanceof Error && error.message.includes('401')) {
      console.log('ℹ️ Authentication required - this is expected behavior');
      console.log('ℹ️ Chat will work once user is authenticated');
    }
    
    return false;
  }
}

export async function testAuthIntegration() {
  console.log('🔐 Testing Auth Integration...');
  
  try {
    // Test auth status
    const isAuthenticated = authService.isAuthenticated();
    console.log('Authentication status:', isAuthenticated);
    
    if (isAuthenticated) {
      const profile = await authService.getProfile();
      console.log('✅ User profile loaded:', profile.email);
    } else {
      console.log('ℹ️ No user authenticated - guest mode active');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Auth integration test failed:', error);
    return false;
  }
}

// Helper function to run all tests
export async function runIntegrationTests() {
  console.log('🚀 Running Integration Tests...');
  
  const authResult = await testAuthIntegration();
  const chatResult = await testChatIntegration();
  
  console.log('\n📊 Test Results:');
  console.log('Auth Integration:', authResult ? '✅ PASS' : '❌ FAIL');
  console.log('Chat Integration:', chatResult ? '✅ PASS' : '❌ FAIL');
  
  return authResult && chatResult;
}