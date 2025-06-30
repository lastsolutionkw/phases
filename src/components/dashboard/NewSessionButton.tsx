import Link from 'next/link';

export default function NewSessionButton() {
  return (
    <Link
      href="/chat"
      className="block w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
    >
      <div className="flex items-center space-x-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div>
          <div className="font-semibold">Start New Conversation</div>
          <div className="text-sm text-white/80">Your AI companion is ready to listen</div>
        </div>
      </div>
    </Link>
  );
}