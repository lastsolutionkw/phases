'use client';

import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SuggestedReplies from './SuggestedReplies';
import { ChatMessage } from '@/types';

interface ChatWindowProps {
  className?: string;
}

export default function ChatWindow({ className = '' }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm here to listen and support you. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedReplies = [
    "I'm feeling overwhelmed",
    "I'd like to talk about my day",
    "I'm struggling with anxiety",
    "I need someone to listen"
  ];

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Replies */}
      {messages.length === 1 && (
        <div className="px-6 pb-4">
          <SuggestedReplies 
            suggestions={suggestedReplies}
            onSelect={(suggestion) => {
              // Handle suggestion selection
              console.log('Selected:', suggestion);
            }}
          />
        </div>
      )}
    </div>
  );
}