'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useChat } from '@/contexts/ChatContext';
import { chatService, ChatHistoryResponse } from '@/services/chatService';

interface ChatHistoryProps {
  onSelectSession?: (sessionId: string) => void;
  className?: string;
}

export default function ChatHistory({ onSelectSession, className = '' }: ChatHistoryProps) {
  const { t } = useLanguage();
  const { loadSession, clearSession } = useChat();
  const [history, setHistory] = useState<ChatHistoryResponse['sessions']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await chatService.getChatHistory();
      setHistory(response.sessions);
    } catch (error) {
      console.group('🚨 CHAT HISTORY ERROR - Load History');
      console.error('❌ Failed to load chat history:', error);
      console.error('📝 Context:', {
        timestamp: new Date().toISOString(),
        currentUrl: window.location.href
      });
      console.groupEnd();
      setError(error instanceof Error ? error.message : 'Failed to load chat history');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSession = async (sessionId: string) => {
    try {
      await loadSession(sessionId);
      onSelectSession?.(sessionId);
    } catch (error) {
      console.group('🚨 CHAT HISTORY ERROR - Load Session');
      console.error('❌ Failed to load session:', error);
      console.error('📝 Context:', {
        timestamp: new Date().toISOString(),
        sessionId: sessionId,
        currentUrl: window.location.href
      });
      console.groupEnd();
    }
  };

  const handleDeleteSession = async (sessionId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (!confirm(t('chat.confirmDelete'))) {
      return;
    }

    try {
      await chatService.deleteChatSession(sessionId);
      setHistory(prev => prev.filter(session => session.id !== sessionId));
    } catch (error) {
      console.group('🚨 CHAT HISTORY ERROR - Delete Session');
      console.error('❌ Failed to delete session:', error);
      console.error('📝 Context:', {
        timestamp: new Date().toISOString(),
        sessionId: sessionId,
        currentUrl: window.location.href
      });
      console.groupEnd();
    }
  };

  const handleNewChat = () => {
    clearSession();
    onSelectSession?.('new');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 24 * 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  if (isLoading) {
    return (
      <div className={`p-4 ${className}`}>
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 ${className}`}>
      {/* New Chat Button */}
      <button
        onClick={handleNewChat}
        className="w-full mb-4 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        {t('chat.newChat')}
      </button>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Chat History */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('chat.history')}
        </h3>
        
        {history.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('chat.noHistory')}
          </p>
        ) : (
          history.map((session) => (
            <div
              key={session.id}
              onClick={() => handleSelectSession(session.id)}
              className="group p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {session.summary || t('chat.untitledChat')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {t('chat.messageCount', { count: session.message_count })} • {formatDate(session.start_time)}
                  </p>
                </div>
                <button
                  onClick={(e) => handleDeleteSession(session.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}