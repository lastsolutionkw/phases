import ChatWindow from '@/components/chat/ChatWindow';
import MessageInputBox from '@/components/chat/MessageInputBox';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Minimal Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Chat with your AI companion
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Share what's on your mind in a safe, judgment-free space
          </p>
        </header>

        {/* Chat Interface */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg h-[70vh] flex flex-col">
          <ChatWindow />
          <MessageInputBox />
        </div>

        {/* Emergency Notice */}
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-200">
            <strong>If you're in crisis:</strong> This AI cannot replace professional help. 
            <a href="/emergency" className="underline font-medium ml-1">
              Get immediate support here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}