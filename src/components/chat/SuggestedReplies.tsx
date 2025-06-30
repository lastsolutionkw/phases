'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface SuggestedRepliesProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export default function SuggestedReplies({ suggestions, onSelect }: SuggestedRepliesProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t('chat.suggestedReplies.label')}
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border border-blue-200 dark:border-blue-800"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}