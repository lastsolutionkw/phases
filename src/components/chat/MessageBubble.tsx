import { ChatMessage } from '@/types';
import EmotionTagger from './EmotionTagger';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  const timeString = message.timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        isUser 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
      }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        
        {message.emotion && (
          <div className="mt-2">
            <EmotionTagger emotion={message.emotion} />
          </div>
        )}
        
        <div className={`text-xs mt-2 ${
          isUser 
            ? 'text-blue-200' 
            : 'text-gray-500 dark:text-gray-400'
        }`}>
          {timeString}
        </div>
      </div>
    </div>
  );
}