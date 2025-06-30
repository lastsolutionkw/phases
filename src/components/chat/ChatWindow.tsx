'use client';

import { useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SuggestedReplies from './SuggestedReplies';
import { useLanguage } from '@/contexts/LanguageContext';
import { useChat } from '@/contexts/ChatContext';
import { logger } from '@/utils/logger';

interface ChatWindowProps {
  className?: string;
  onSendMessage?: (message: string) => void;
}

export default function ChatWindow({ className = '', onSendMessage }: ChatWindowProps) {
  const { t } = useLanguage();
  const { messages, isTyping, currentSession, startNewSession, sendMessage, error } = useChat();

  useEffect(() => {
    if (!currentSession) {
      logger.chatEvent('auto-starting new session', { component: 'ChatWindow' });
      startNewSession().catch((error) => {
        logger.error('Failed to auto-start session in ChatWindow', error, {
          component: 'ChatWindow',
          action: 'auto-start'
        });
      });
    }
  }, [currentSession, startNewSession]);

  const suggestedReplies = [
    t('chat.suggestedReplies.overwhelmed'),
    t('chat.suggestedReplies.talkDay'),
    t('chat.suggestedReplies.anxiety'),
    t('chat.suggestedReplies.needListener')
  ];

  const handleSuggestionSelect = async (suggestion: string) => {
    try {
      logger.userAction('selected suggestion', {
        component: 'ChatWindow',
        suggestion: suggestion.substring(0, 50)
      });
      await sendMessage(suggestion);
      onSendMessage?.(suggestion);
      logger.success('Suggestion sent successfully', {
        component: 'ChatWindow',
        messageLength: suggestion.length
      });
    } catch (error) {
      logger.error('Failed to send suggestion from ChatWindow', error, {
        component: 'ChatWindow',
        suggestion: suggestion.substring(0, 50)
      });
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Error Message */}
      {error && (
        <div className="px-6 py-2 bg-red-50 border-l-4 border-red-400 text-red-700">
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Suggested Replies */}
      {messages.length === 1 && !isTyping && (
        <div className="px-6 pb-4">
          <SuggestedReplies 
            suggestions={suggestedReplies}
            onSelect={handleSuggestionSelect}
          />
        </div>
      )}
    </div>
  );
}