'use client';

import { useState } from 'react';

interface FilterState {
  types: string[];
  categories: string[];
  duration: string;
}

interface ResourceFilterPanelProps {
  onFiltersChange?: (filters: FilterState) => void;
}

export default function ResourceFilterPanel({ onFiltersChange }: ResourceFilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    categories: [],
    duration: 'all'
  });

  const resourceTypes = [
    { id: 'article', label: 'Articles', icon: '📄' },
    { id: 'meditation', label: 'Meditations', icon: '🧘‍♀️' },
    { id: 'exercise', label: 'Exercises', icon: '🏃‍♂️' },
    { id: 'video', label: 'Videos', icon: '🎥' }
  ];

  const categories = [
    'Anxiety',
    'Depression',
    'Stress',
    'Sleep',
    'Mindfulness',
    'Relaxation',
    'Self-Care',
    'Relationships',
    'Work-Life Balance'
  ];

  const durationOptions = [
    { id: 'all', label: 'Any Duration' },
    { id: 'short', label: '5 min or less' },
    { id: 'medium', label: '5-15 min' },
    { id: 'long', label: '15+ min' }
  ];

  const handleTypeToggle = (type: string) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    
    const newFilters = { ...filters, types: newTypes };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleDurationChange = (duration: string) => {
    const newFilters = { ...filters, duration };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const newFilters = { types: [], categories: [], duration: 'all' };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const hasActiveFilters = filters.types.length > 0 || filters.categories.length > 0 || filters.duration !== 'all';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Resource Types */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Type
        </h3>
        <div className="space-y-2">
          {resourceTypes.map((type) => (
            <label key={type.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.types.includes(type.id)}
                onChange={() => handleTypeToggle(type.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                <span className="mr-2">{type.icon}</span>
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Categories
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <label key={category} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Duration
        </h3>
        <div className="space-y-2">
          {durationOptions.map((option) => (
            <label key={option.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="duration"
                value={option.id}
                checked={filters.duration === option.id}
                onChange={() => handleDurationChange(option.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Active Filters
          </h4>
          <div className="space-y-1 text-xs">
            {filters.types.length > 0 && (
              <p className="text-gray-600 dark:text-gray-400">
                Types: {filters.types.join(', ')}
              </p>
            )}
            {filters.categories.length > 0 && (
              <p className="text-gray-600 dark:text-gray-400">
                Categories: {filters.categories.join(', ')}
              </p>
            )}
            {filters.duration !== 'all' && (
              <p className="text-gray-600 dark:text-gray-400">
                Duration: {durationOptions.find(d => d.id === filters.duration)?.label}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}