import Link from 'next/link';

export default function GuestContinueCard() {
  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
      <div className="text-center">
        <div className="text-2xl mb-2">🌟</div>
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
          Try Without Signing Up
        </h3>
        <p className="text-green-700 dark:text-green-300 text-sm mb-4">
          Start a conversation immediately with complete anonymity. 
          No personal information required.
        </p>
        <Link
          href="/chat"
          className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Continue as Guest
        </Link>
      </div>
      
      <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
        <div className="flex items-center justify-center space-x-4 text-xs text-green-600 dark:text-green-400">
          <div className="flex items-center">
            <span className="mr-1">🔒</span>
            Anonymous
          </div>
          <div className="flex items-center">
            <span className="mr-1">⚡</span>
            Instant Access
          </div>
          <div className="flex items-center">
            <span className="mr-1">🚫</span>
            No Data Stored
          </div>
        </div>
      </div>
    </div>
  );
}