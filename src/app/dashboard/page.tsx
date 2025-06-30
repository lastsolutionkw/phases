import MoodTrackerGraph from '@/components/dashboard/MoodTrackerGraph';
import ChatSummaryCard from '@/components/dashboard/ChatSummaryCard';
import GoalProgressWidget from '@/components/dashboard/GoalProgressWidget';
import NewSessionButton from '@/components/dashboard/NewSessionButton';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Wellness Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Track your progress and continue your mental wellness journey
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <NewSessionButton />
                <button className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                  Log Your Mood
                </button>
                <button className="w-full text-left p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                  Browse Resources
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <ChatSummaryCard />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mood Tracking */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Mood Trends
            </h2>
            <MoodTrackerGraph />
          </div>

          {/* Goals Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Goals
            </h2>
            <GoalProgressWidget />
          </div>
        </div>

        {/* Insights */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Personal Insights
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                This Week's Progress
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                You've had 3 meaningful conversations and your mood has been stable. Keep up the great work!
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Recommended Activity
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Try the "5-minute breathing exercise" in your resources to maintain your positive momentum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}