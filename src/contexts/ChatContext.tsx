'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { ChatMessage, ChatSession } from '@/types';
import { chatService, SendMessageRequest } from '@/services/chatService';
import { authService } from '@/services/authService';

interface ChatContextState {
  currentSession: ChatSession | null;
  messages: ChatMessage[];
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
}

type ChatAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'START_SESSION'; payload: ChatSession }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_MESSAGES'; payload: ChatMessage[] }
  | { type: 'CLEAR_SESSION' };

const initialState: ChatContextState = {
  currentSession: null,
  messages: [],
  isLoading: false,
  isTyping: false,
  error: null,
};

function chatReducer(state: ChatContextState, action: ChatAction): ChatContextState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'START_SESSION':
      return {
        ...state,
        currentSession: action.payload,
        messages: action.payload.messages,
        error: null,
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload,
      };
    case 'CLEAR_SESSION':
      return {
        ...state,
        currentSession: null,
        messages: [],
        error: null,
      };
    default:
      return state;
  }
}

interface ChatContextValue extends ChatContextState {
  startNewSession: () => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  loadSession: (sessionId: string) => Promise<void>;
  clearSession: () => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const startNewSession = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const response = await chatService.startChat();
      
      const userId = authService.isAuthenticated() ? 
        (await authService.getProfile().catch(() => ({ id: 'guest' }))).id : 
        'guest';

      const newSession: ChatSession = {
        id: response.id,
        userId,
        messages: [],
        startTime: new Date(response.created_at),
      };
      
      dispatch({ type: 'START_SESSION', payload: newSession });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to start chat' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    let sessionToUse = state.currentSession;
    
    // If no session exists, start one first
    if (!sessionToUse) {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await chatService.startChat();
        
        const userId = authService.isAuthenticated() ? 
          (await authService.getProfile().catch(() => ({ id: 'guest' }))).id : 
          'guest';

        sessionToUse = {
          id: response.id,
          userId,
          messages: [],
          startTime: new Date(response.created_at),
        };
        
        dispatch({ type: 'START_SESSION', payload: sessionToUse });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to start chat session' });
        return;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_TYPING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const request: SendMessageRequest = {
        session_id: sessionToUse.id,
        message: content,
      };

      const response = await chatService.sendMessage(request);

      const aiMessage: ChatMessage = {
        id: response.ai_response.id.toString(),
        content: response.ai_response.content,
        sender: 'ai',
        timestamp: new Date(response.ai_response.timestamp),
      };

      dispatch({ type: 'ADD_MESSAGE', payload: aiMessage });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to send message' });
    } finally {
      dispatch({ type: 'SET_TYPING', payload: false });
    }
  }, [state.currentSession]);

  const loadSession = useCallback(async (sessionId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const sessionData = await chatService.getChatSession(sessionId);
      const session = chatService.transformSessionToUI(sessionData);
      
      dispatch({ type: 'START_SESSION', payload: session });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load session' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const clearSession = useCallback(() => {
    dispatch({ type: 'CLEAR_SESSION' });
  }, []);

  const value: ChatContextValue = {
    ...state,
    startNewSession,
    sendMessage,
    loadSession,
    clearSession,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}