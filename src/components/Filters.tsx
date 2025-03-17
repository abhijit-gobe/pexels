import React from 'react';
import { useStore } from '../store/useStore';
import { SearchFilters, Orientation, Size, SortBy } from '../types';

export const Filters: React.FC = () => {
  const { filters, setFilters } = useStore();

  const colors = [
    { name: 'red', bg: 'bg-red-500' },
    { name: 'orange', bg: 'bg-orange-500' },
    { name: 'yellow', bg: 'bg-yellow-500' },
    { name: 'green', bg: 'bg-green-500' },
    { name: 'blue', bg: 'bg-blue-500' },
    { name: 'purple', bg: 'bg-purple-500' },
    { name: 'pink', bg: 'bg-pink-500' },
    { name: 'brown', bg: 'bg-amber-800' },
    { name: 'black', bg: 'bg-black' },
    { name: 'white', bg: 'bg-white border border-gray-200' },
    { name: 'gray', bg: 'bg-gray-500' }
  ];

  const orientations: Orientation[] = ['landscape', 'portrait', 'square'];
  const sizes: Size[] = ['small', 'medium', 'large'];
  const sortOptions: SortBy[] = ['relevant', 'newest', 'popular'];

  return (
    <div className="flex flex-wrap gap-6 p-4 bg-white dark:bg-gray-800 justify-between">
      
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Orientation</label>
        <div className="flex gap-2">
          {orientations.map((orientation) => (
            <button
              key={orientation}
              onClick={() => setFilters({ orientation })}
              className={`px-4 py-2 rounded-full text-sm capitalize ${
                filters.orientation === orientation
                  ? 'bg-[#05A081] text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              } transition-colors`}
            >
              {orientation}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Size</label>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setFilters({ size })}
              className={`px-4 py-2 rounded-full text-sm capitalize ${
                filters.size === size
                  ? 'bg-[#05A081] text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              } transition-colors`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Sort By</label>
        <div className="flex gap-2">
          {sortOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFilters({ sortBy: option })}
              className={`px-4 py-2 rounded-full text-sm capitalize ${
                filters.sortBy === option
                  ? 'bg-[#05A081] text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              } transition-colors`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};