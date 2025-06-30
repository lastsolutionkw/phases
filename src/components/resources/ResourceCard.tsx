'use client';

interface ResourceCardProps {
  title: string;
  type: 'article' | 'meditation' | 'exercise' | 'video';
  duration?: number;
  description: string;
  category: string;
  url?: string;
  featured?: boolean;
}

export default function ResourceCard({ 
  title, 
  type, 
  duration, 
  description, 
  category, 
  url, 
  featured = false 
}: ResourceCardProps) {
  const getTypeIcon = () => {
    switch (type) {
      case 'article': return '📄';
      case 'meditation': return '🧘‍♀️';
      case 'exercise': return '🏃‍♂️';
      case 'video': return '🎥';
      default: return '📋';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
      case 'meditation': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300';
      case 'exercise': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300';
      case 'video': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group ${
      featured ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getTypeIcon()}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor()}`}>
              {type}
            </span>
          </div>
          {duration && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {duration}min
            </span>
          )}
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
            {category}
          </span>
          
          <div className="flex items-center space-x-2">
            <button 
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              onClick={() => {
                if (url) {
                  window.open(url, '_blank');
                } else {
                  console.log('View resource:', title);
                }
              }}
            >
              {type === 'article' ? 'Read' : type === 'video' ? 'Watch' : 'Start'}
            </button>
            
            <button className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {featured && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2">
          <p className="text-white text-xs text-center font-medium">
            ⭐ Featured Resource
          </p>
        </div>
      )}
    </div>
  );
}