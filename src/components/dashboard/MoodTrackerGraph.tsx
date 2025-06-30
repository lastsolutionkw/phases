'use client';

import { useState } from 'react';

export default function MoodTrackerGraph() {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  
  // Mock data for demonstration
  const moodData = {
    '7days': [
      { day: 'Mon', mood: 7, date: '2024-01-15' },
      { day: 'Tue', mood: 5, date: '2024-01-16' },
      { day: 'Wed', mood: 8, date: '2024-01-17' },
      { day: 'Thu', mood: 6, date: '2024-01-18' },
      { day: 'Fri', mood: 9, date: '2024-01-19' },
      { day: 'Sat', mood: 7, date: '2024-01-20' },
      { day: 'Sun', mood: 8, date: '2024-01-21' },
    ],
    '30days': [
      { day: 'Week 1', mood: 6.5, date: '2024-01-01' },
      { day: 'Week 2', mood: 7.2, date: '2024-01-08' },
      { day: 'Week 3', mood: 5.8, date: '2024-01-15' },
      { day: 'Week 4', mood: 7.8, date: '2024-01-22' },
    ]
  };

  const currentData = moodData[selectedPeriod as keyof typeof moodData];
  const maxMood = 10;

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return 'bg-green-500';
    if (mood >= 6) return 'bg-yellow-500';
    if (mood >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getMoodEmoji = (mood: number) => {
    if (mood >= 8) return '😊';
    if (mood >= 6) return '😐';
    if (mood >= 4) return '😔';
    return '😢';
  };

  const averageMood = currentData.reduce((sum, entry) => sum + entry.mood, 0) / currentData.length;

  return (
    <div className="space-y-4">
      {/* Period Selector */}
      <div className="flex space-x-2">
        <button
          onClick={() => setSelectedPeriod('7days')}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            selectedPeriod === '7days'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          7 Days
        </button>
        <button
          onClick={() => setSelectedPeriod('30days')}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            selectedPeriod === '30days'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          30 Days
        </button>
      </div>

      {/* Average Mood */}
      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Mood</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {averageMood.toFixed(1)}/10
            </p>
          </div>
          <div className="text-3xl">
            {getMoodEmoji(averageMood)}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-2">
        <div className="flex items-end space-x-2 h-32">
          {currentData.map((entry, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-end justify-center h-24">
                <div
                  className={`w-4 rounded-t-sm ${getMoodColor(entry.mood)} transition-all duration-300`}
                  style={{ height: `${(entry.mood / maxMood) * 100}%` }}
                  title={`${entry.day}: ${entry.mood}/10`}
                />
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">
                {entry.day}
              </div>
            </div>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-2">
          <span>Poor</span>
          <span>Great</span>
        </div>
      </div>

      {/* Quick Mood Log */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">How are you feeling today?</p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mood) => (
            <button
              key={mood}
              onClick={() => console.log(`Mood logged: ${mood}`)}
              className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-xs font-medium transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              {mood}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}