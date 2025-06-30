import { api } from './api';
import { ChatMessage, ChatSession } from '@/types';

export interface StartChatResponse {
  id: string;
  title?: string;
  created_at: string;
}

export interface SendMessageRequest {
  session_id: string;
  message: string;
}

export interface SendMessageResponse {
  user_message: {
    id: string;
    content: string;
    timestamp: string;
  };
  ai_response: {
    id: string;
    content: string;
    timestamp: string;
  };
}

export interface ChatHistoryResponse {
  sessions: Array<{
    id: string;
    summary: string;
    start_time: string;
    end_time?: string;
    message_count: number;
  }>;
}

export interface ChatSessionResponse {
  id: string;
  messages: Array<{
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: string;
  }>;
  start_time: string;
  end_time?: string;
}

export const chatService = {
  async startChat(title?: string): Promise<StartChatResponse> {
    return api.post('/chat/start/', { title: title || "New Chat Session" });
  },

  async sendMessage(request: SendMessageRequest): Promise<SendMessageResponse> {
    return api.post('/chat/message/', request);
  },

  async getChatHistory(): Promise<ChatHistoryResponse> {
    return api.get('/chat/history/');
  },

  async getChatSession(sessionId: string): Promise<ChatSessionResponse> {
    return api.get(`/chat/session/${sessionId}/`);
  },

  async deleteChatSession(sessionId: string): Promise<void> {
    return api.delete(`/chat/session/${sessionId}/`);
  },

  transformMessageToUI(apiMessage: any): ChatMessage {
    return {
      id: apiMessage.id.toString(),
      content: apiMessage.content,
      sender: apiMessage.sender,
      timestamp: new Date(apiMessage.timestamp),
    };
  },

  transformSessionToUI(apiSession: ChatSessionResponse): ChatSession {
    return {
      id: apiSession.id,
      userId: '', // Will be filled from auth context
      messages: apiSession.messages.map(this.transformMessageToUI),
      startTime: new Date(apiSession.start_time),
      endTime: apiSession.end_time ? new Date(apiSession.end_time) : undefined,
    };
  },
};