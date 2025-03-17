import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Heart, Download, Share2, User } from 'lucide-react';
import { Photo } from '../types';
import { useStore } from '../store/useStore';

interface ImageGridProps {
  photos: Photo[];
  loading: boolean;
  onLoadMore: () => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  photos,
  loading,
  onLoadMore,
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && !loading) {
        onLoadMore();
      }
    },
  });

  const { favorites, addFavorite, removeFavorite } = useStore();

  const handleFavorite = (photo: Photo) => {
    const isFavorite = favorites.some((f) => f.id === photo.id);
    if (isFavorite) {
      removeFavorite(photo.id);
    } else {
      addFavorite(photo);
    }
  };

  const handleShare = async (photo: Photo) => {
    try {
      await navigator.share({
        title: photo.alt,
        text: `Check out this photo by ${photo.photographer}`,
        url: photo.url,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="relative break-inside-avoid mb-4 group rounded-lg overflow-hidden"
        >
          <img
            src={photo.src.large}
            alt={photo.alt}
            loading="lazy"
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-4 left-4 flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <span className="ml-2 text-white font-medium">{photo.photographer}</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleFavorite(photo)}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    aria-label={favorites.some((f) => f.id === photo.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      size={20}
                      className={favorites.some((f) => f.id === photo.id) ? 'fill-red-500 text-red-500' : 'text-white'}
                    />
                  </button>
                  <button
                    onClick={() => window.open(photo.src.original, '_blank')}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    aria-label="Download photo"
                  >
                    <Download size={20} className="text-white" />
                  </button>
                  <button
                    onClick={() => handleShare(photo)}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    aria-label="Share photo"
                  >
                    <Share2 size={20} className="text-white" />
                  </button>
                </div>
                <button
                  className="px-4 py-2 bg-[#05A081] text-white rounded-full text-sm font-medium hover:bg-[#048668] transition-colors"
                  onClick={() => window.open(photo.src.original, '_blank')}
                >
                  Download
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {photo.alt.split(' ').slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white/20 rounded-full text-white text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      {loading && (
        <div className="col-span-full flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#05A081]"></div>
        </div>
      )}
      <div ref={ref} className="h-10" />
    </div>
  );
};