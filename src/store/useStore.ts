import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Photo, SearchFilters } from '../types';

interface Store {
  favorites: Photo[];
  searchHistory: string[];
  filters: SearchFilters;
  isDarkMode: boolean;
  addFavorite: (photo: Photo) => void;
  removeFavorite: (id: number) => void;
  addSearchTerm: (term: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  toggleDarkMode: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      favorites: [],
      searchHistory: [],
      filters: {
        sortBy: 'relevant',
      },
      isDarkMode: false,
      addFavorite: (photo) =>
        set((state) => ({
          favorites: [...state.favorites, { ...photo, liked: true }],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((photo) => photo.id !== id),
        })),
      addSearchTerm: (term) =>
        set((state) => ({
          searchHistory: [
            term,
            ...state.searchHistory.filter((t) => t !== term),
          ].slice(0, 10),
        })),
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'image-search-storage',
    }
  )
);