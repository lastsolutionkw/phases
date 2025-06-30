'use client';

import { useState } from 'react';

interface MessageInputBoxProps {
  onSendMessage?: (message: string) => void;
  disabled?: boolean;
}

export default function MessageInputBox({ onSendMessage, disabled = false }: MessageInputBoxProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage?.(message.trim());
      setMessage('');
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
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
            disabled={disabled}
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() || disabled}
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
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span>{message.length}/1000</span>
      </div>
    </div>
  );
}