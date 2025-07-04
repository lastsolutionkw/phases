'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useChat } from '@/contexts/ChatContext';

interface MessageInputBoxProps {
  onSendMessage?: (message: string) => void;
  disabled?: boolean;
}

export default function MessageInputBox({ onSendMessage, disabled = false }: MessageInputBoxProps) {
  const { t } = useLanguage();
  const { sendMessage, isLoading, isTyping } = useChat();
  const [message, setMessage] = useState('');

  const isDisabled = disabled || isLoading || isTyping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isDisabled) {
      const messageToSend = message.trim();
      setMessage('');
      
      try {
        await sendMessage(messageToSend);
        onSendMessage?.(messageToSend);
      } catch (error) {
        setMessage(messageToSend);
        console.group('🚨 MESSAGE INPUT ERROR');
        console.error('❌ Failed to send message from input box:', error);
        console.error('📝 Message details:', {
          timestamp: new Date().toISOString(),
          messageLength: messageToSend.length,
          messagePreview: messageToSend.substring(0, 50) + (messageToSend.length > 50 ? '...' : ''),
          currentUrl: window.location.href
        });
        console.groupEnd();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3 rtl:space-x-reverse">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chat.placeholder')}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
            disabled={isDisabled}
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() || isDisabled}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white p-3 rounded-xl transition-colors disabled:cursor-not-allowed"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
            />
          </svg>
        </button>
      </form>
      
      <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
        <span>{t('chat.sendHint')}</span>
        <span>{t('chat.characterLimit', { current: message.length, max: 1000 })}</span>
      </div>
    </div>
  );
}