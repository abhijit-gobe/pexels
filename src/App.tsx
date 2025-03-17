import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Sun, Moon, ArrowUp, Upload, LogIn } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { ImageGrid } from './components/ImageGrid';
import { Filters } from './components/Filters';
import { Header } from './components/Header';
import { api } from './services/api';
import { useStore } from './store/useStore';
import { Photo } from './types';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { isDarkMode, toggleDarkMode, filters } = useStore();

  const { data, isLoading, isFetching, error } = useQuery(
    ['photos', query, page, filters],
    () => (query ? api.search(query, page, filters) : api.getCurated(page)),
    {
      keepPreviousData: true,
      retry: 2,
      onError: (error) => {
        console.error('Error fetching photos:', error);
      }
    }
  );

  useEffect(() => {
    if (data?.photos) {
      setPhotos((prev) => (page === 1 ? data.photos : [...prev, ...data.photos]));
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
    setPhotos([]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Images</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Please check your API key and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header>
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-[#232323] dark:text-white">
              Pexels
            </h1>
            <nav className="hidden md:flex space-x-6">
              
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="text-yellow-500" size={24} />
              ) : (
                <Moon className="text-gray-600" size={24} />
              )}
            </button>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto">
            <Filters />
          </div>
        </div>
      </Header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {photos.length === 0 && !isLoading && !isFetching ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {query ? 'No images found. Try a different search term.' : 'Start searching for images!'}
            </p>
          </div>
        ) : (
          <ImageGrid
            photos={photos}
            loading={isLoading || isFetching}
            onLoadMore={() => setPage((p) => p + 1)}
          />
        )}
      </main>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-[#05A081] text-white rounded-full shadow-lg hover:bg-[#048668] transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}

export default App;