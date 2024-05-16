import { Movie } from "./Movies";

export interface SearchResponse {
  page: number;
  results: Array<MovieResponse>;
  total_pages: number;
  total_results: number;
}

export interface MovieResponse extends Movie {
  adult: boolean;
  backdrop_path: string | null;
  original_language: string;
  overview: string;
  popularity: number;
  title: string;
  video: boolean;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompanies {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}
export interface MovieTrailer {
  results: Array<Trailer>;
}

interface Trailer {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface MovieGenres {
  genres: Array<Genre>;
}

export interface ErrorResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}
