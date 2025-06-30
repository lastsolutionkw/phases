'use client';

interface QuickContactButtonProps {
  type: 'emergency' | 'suicide' | 'crisis';
  title: string;
  number: string;
  description: string;
  color: 'red' | 'purple' | 'blue';
}

export default function QuickContactButton({ 
  type, 
  title, 
  number, 
  description, 
  color 
}: QuickContactButtonProps) {
  const getColorStyles = () => {
    switch (color) {
      case 'red':
        return {
          bg: 'bg-red-600 hover:bg-red-700',
          text: 'text-white',
          icon: 'bg-red-500'
        };
      case 'purple':
        return {
          bg: 'bg-purple-600 hover:bg-purple-700',
          text: 'text-white',
          icon: 'bg-purple-500'
        };
      case 'blue':
        return {
          bg: 'bg-blue-600 hover:bg-blue-700',
          text: 'text-white',
          icon: 'bg-blue-500'
        };
      default:
        return {
          bg: 'bg-gray-600 hover:bg-gray-700',
          text: 'text-white',
          icon: 'bg-gray-500'
        };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'emergency':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'suicide':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'crisis':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleContact = () => {
    if (number.includes('Text')) {
      // Handle text message
      console.log('Opening text message to:', number);
    } else {
      // Handle phone call
      window.location.href = `tel:${number.replace(/\D/g, '')}`;
    }
  };

  const styles = getColorStyles();

  return (
    <button
      onClick={handleContact}
      className={`w-full p-6 ${styles.bg} ${styles.text} rounded-xl transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform`}
    >
      <div className="flex items-center space-x-4">
        <div className={`${styles.icon} p-3 rounded-lg`}>
          {getIcon()}
        </div>
        <div className="text-left flex-1">
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-2xl font-bold mb-2">{number}</p>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </button>
  );
}