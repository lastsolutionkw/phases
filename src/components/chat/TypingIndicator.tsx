import { useLanguage } from '@/contexts/LanguageContext';

export default function TypingIndicator() {
  const { t } = useLanguage();

  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl max-w-xs">
        <div className="flex space-x-1 rtl:space-x-reverse items-center">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            {t('chat.aiTyping')}
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}