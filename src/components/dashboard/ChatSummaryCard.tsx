import Link from 'next/link';

export default function ChatSummaryCard() {
  // Mock data for recent chat sessions
  const recentSessions = [
    {
      id: '1',
      date: '2024-01-21',
      time: '2:30 PM',
      duration: '15 min',
      summary: 'Discussed work stress and coping strategies',
      mood: 'anxious → calm',
      keyTopics: ['work stress', 'breathing exercises']
    },
    {
      id: '2',
      date: '2024-01-19',
      time: '7:45 PM',
      duration: '22 min',
      summary: 'Talked about relationship concerns and communication',
      mood: 'frustrated → hopeful',
      keyTopics: ['relationships', 'communication']
    },
    {
      id: '3',
      date: '2024-01-17',
      time: '1:15 PM',
      duration: '18 min',
      summary: 'Explored self-care routines and goal setting',
      mood: 'neutral → motivated',
      keyTopics: ['self-care', 'goals']
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Recent Conversations
        </h2>
        <Link 
          href="/chat"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
        >
          Start New Session
        </Link>
      </div>

      <div className="space-y-4">
        {recentSessions.map((session) => (
          <div key={session.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{session.date}</span>
                  <span>•</span>
                  <span>{session.time}</span>
                  <span>•</span>
                  <span>{session.duration}</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-900 dark:text-white text-sm mb-2">
              {session.summary}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Mood:</span>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                    {session.mood}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Topics:</span>
                  <div className="flex space-x-1">
                    {session.keyTopics.map((topic, index) => (
                      <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Session Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              12
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Total Sessions
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              4.2h
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Total Time
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              18min
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Avg Session
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}