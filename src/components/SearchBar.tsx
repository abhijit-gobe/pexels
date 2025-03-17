import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useStore } from '../store/useStore';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { searchHistory, addSearchTerm } = useStore();

  useEffect(() => {
    if (query.length > 2) {
      const filtered = searchHistory.filter((term) =>
        term.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, searchHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      addSearchTerm(query.trim());
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for free photos..."
          className="w-full px-6 py-4 pl-12 text-lg rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#05A081] focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder-gray-400"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
      </form>
      
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setQuery(suggestion);
                onSearch(suggestion);
                setSuggestions([]);
              }}
              className="w-full px-6 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};