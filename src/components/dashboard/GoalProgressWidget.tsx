'use client';

import { useState } from 'react';

export default function GoalProgressWidget() {
  const [goals] = useState([
    {
      id: '1',
      title: 'Practice daily meditation',
      description: 'Meditate for 10 minutes each day',
      progress: 75,
      targetDate: '2024-02-15',
      completed: false
    },
    {
      id: '2',
      title: 'Improve sleep schedule',
      description: 'Go to bed by 11 PM consistently',
      progress: 60,
      targetDate: '2024-02-01',
      completed: false
    },
    {
      id: '3',
      title: 'Practice gratitude',
      description: 'Write 3 things I\'m grateful for daily',
      progress: 100,
      targetDate: '2024-01-31',
      completed: true
    }
  ]);

  const getProgressColor = (progress: number, completed: boolean) => {
    if (completed) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  const getDaysRemaining = (targetDate: string) => {
    const target = new Date(targetDate);
    const today = new Date();
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-4">
      {/* Add New Goal Button */}
      <button className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-xl">+</span>
          <span className="text-sm font-medium">Add New Goal</span>
        </div>
      </button>

      {/* Goals List */}
      <div className="space-y-3">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                  {goal.title}
                  {goal.completed && (
                    <span className="ml-2 text-green-500">✓</span>
                  )}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {goal.description}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(goal.progress, goal.completed)}`}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>

            {/* Target Date */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">
                Target: {new Date(goal.targetDate).toLocaleDateString()}
              </span>
              {!goal.completed && (
                <span className={`font-medium ${
                  getDaysRemaining(goal.targetDate) < 7 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {getDaysRemaining(goal.targetDate)} days left
                </span>
              )}
              {goal.completed && (
                <span className="text-green-600 dark:text-green-400 font-medium">
                  Completed! 🎉
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Goal Insights */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800 dark:text-blue-200 text-sm mb-2">
          Goal Insights
        </h4>
        <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
          <p>• You've completed 1 out of 3 goals this month</p>
          <p>• Your meditation goal is on track - keep it up!</p>
          <p>• Consider breaking down larger goals into smaller steps</p>
        </div>
      </div>
    </div>
  );
}