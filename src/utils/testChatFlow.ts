import { chatService } from '@/services/chatService';

export async function testCompleteChatFlow() {
  console.log('=== Starting Mental Health Chat Integration Test ===');
  
  try {
    // 1. Start new chat session
    console.log('1. Starting new chat session...');
    const sessionResponse = await chatService.startChat('Anxiety Support Session');
    const sessionId = sessionResponse.id;
    console.log('Created session ID:', sessionId);
    
    // 2. Send initial message
    console.log('2. Sending initial message...');
    const message1 = await chatService.sendMessage({
      session_id: sessionId,
      message: "I've been feeling overwhelmed lately and could use some guidance."
    });
    console.log('Message 1 response:', message1);
    
    // 3. Follow-up message
    console.log('3. Sending follow-up message...');
    const message2 = await chatService.sendMessage({
      session_id: sessionId,
      message: "Specifically, I'm struggling with work-life balance and constant worry."
    });
    console.log('Message 2 response:', message2);
    
    // 4. Ask for coping strategies
    console.log('4. Asking for coping strategies...');
    const message3 = await chatService.sendMessage({
      session_id: sessionId,
      message: "What are some practical techniques I can try right now to feel better?"
    });
    console.log('Message 3 response:', message3);
    
    // 5. Get session history
    console.log('5. Getting chat history...');
    const history = await chatService.getChatHistory();
    console.log('Chat history:', history);
    
    // 6. Get full session details
    console.log('6. Getting full session details...');
    const sessionDetails = await chatService.getChatSession(sessionId.toString());
    console.log('Session details:', sessionDetails);
    
    console.log('=== Chat Integration Test Complete ===');
    return true;
    
  } catch (error) {
    console.error('❌ Chat flow test failed:', error);
    return false;
  }
}

// Add this to window for easy testing in browser console
if (typeof window !== 'undefined') {
  (window as any).testChatFlow = testCompleteChatFlow;
}