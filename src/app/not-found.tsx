'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-6xl mb-4">🌙</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('notFound.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('notFound.description')}
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('notFound.whereToGo')}
            </h2>
            <div className="space-y-3">
              <Link 
                href="/"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                🏠 {t('notFound.goHome')}
              </Link>
              <Link 
                href="/chat"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                💬 {t('notFound.startChat')}
              </Link>
              <Link 
                href="/resources"
                className="block w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-3 rounded-lg font-medium transition-colors"
              >
                📚 {t('notFound.browseResources')}
              </Link>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>{t('common.brandName')}</strong> {t('notFound.needSupport')}
            </p>
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-500 dark:text-gray-400">
          {t('notFound.error')}
        </div>
      </div>
    </div>
  );
}