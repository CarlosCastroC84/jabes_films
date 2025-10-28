export interface Review {
  author: string;
  rating: number;
  date: string;
  content: string;
}

export interface CastMember {
  name: string;
  role: string;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle: string;
  releaseDate: string;
  runtime: number;
  rating: number;
  ratingCount: number;
  featured: boolean;
  trendingRank?: number;
  genres: string[];
  tagline: string;
  synopsis: string;
  poster: string;
  backdrop: string;
  trailer?: string;
  studios: string[];
  cast: CastMember[];
  reviews: Review[];
}
