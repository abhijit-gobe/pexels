export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export interface SearchResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
  next_page: string;
}

export type Orientation = 'landscape' | 'portrait' | 'square';
export type Size = 'small' | 'medium' | 'large';
export type SortBy = 'newest' | 'popular' | 'relevant';

export interface SearchFilters {
  color?: string;
  orientation?: Orientation;
  size?: Size;
  sortBy: SortBy;
}