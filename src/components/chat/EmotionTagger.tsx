import { EmotionTag } from '@/types';

interface EmotionTaggerProps {
  emotion: EmotionTag;
}

const emotionColors = {
  happy: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
  sad: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  anxious: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
  calm: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  frustrated: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
  excited: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
  neutral: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

export default function EmotionTagger({ emotion }: EmotionTaggerProps) {
  const colorClass = emotionColors[emotion.primary as keyof typeof emotionColors] || emotionColors.neutral;
  
  return (
    <div className="inline-flex items-center space-x-1">
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        {emotion.primary}
      </span>
      {emotion.confidence && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {Math.round(emotion.confidence * 100)}%
        </span>
      )}
    </div>
  );
}