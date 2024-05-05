import { MovieTrailer, ProductionCompanies } from "./Response";

export interface Movie {
  id: number;
  genre_ids: Array<string>;
  original_title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface RatedMovie extends Movie {
  userRating: number;
}

export interface MovieDetails extends Movie {
  // id: number;
  // original_title: string;
  // poster_path: string | null;
  // release_date: string;
  // vote_average: number;
  // vote_count: number;
  runtime: number;
  budget: number;
  revenue: number;
  // genres: Array<Genre>;
  overview: string;
  production_companies: Array<ProductionCompanies>;
  videos?: MovieTrailer;
}
