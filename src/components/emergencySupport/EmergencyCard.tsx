interface EmergencyCardProps {
  title: string;
  priority: 'critical' | 'high' | 'medium';
  content: string[];
}

export default function EmergencyCard({ title, priority, content }: EmergencyCardProps) {
  const getPriorityStyles = () => {
    switch (priority) {
      case 'critical':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'high':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'medium':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600';
    }
  };

  const getPriorityIcon = () => {
    switch (priority) {
      case 'critical':
        return '🚨';
      case 'high':
        return '⚠️';
      case 'medium':
        return 'ℹ️';
      default:
        return '📋';
    }
  };

  const getTitleColor = () => {
    switch (priority) {
      case 'critical':
        return 'text-red-800 dark:text-red-200';
      case 'high':
        return 'text-orange-800 dark:text-orange-200';
      case 'medium':
        return 'text-yellow-800 dark:text-yellow-200';
      default:
        return 'text-gray-800 dark:text-gray-200';
    }
  };

  const getContentColor = () => {
    switch (priority) {
      case 'critical':
        return 'text-red-700 dark:text-red-300';
      case 'high':
        return 'text-orange-700 dark:text-orange-300';
      case 'medium':
        return 'text-yellow-700 dark:text-yellow-300';
      default:
        return 'text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className={`border rounded-xl p-6 ${getPriorityStyles()}`}>
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-2xl">{getPriorityIcon()}</span>
        <h3 className={`text-lg font-semibold ${getTitleColor()}`}>
          {title}
        </h3>
      </div>

      <ul className={`space-y-2 ${getContentColor()}`}>
        {content.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-sm mr-2 mt-0.5">•</span>
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}