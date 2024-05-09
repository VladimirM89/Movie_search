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

// export interface MovieDetailsResponse extends MovieResponse, MovieDetails {
//   // adult: boolean;
//   // backdrop_path: string | null;
//   belongs_to_collection: Collection;
//   // budget: number;
//   // genres: Array<Genre>;
//   homepage: string;
//   // id: number;
//   imdb_id: string;
//   original_country: Array<string>;
//   // original_language: string;
//   // original_title: string;
//   // overview: string;
//   // popularity: number;
//   // poster_path: string;
//   // production_companies: Array<ProductionCompanies>;
//   production_countries: Array<ProductionCountries>;
//   // release_date: string;
//   // revenue: number;
//   // runtime: number;
//   spoken_languages: Array<SpokenLanguages>;
//   status: string;
//   tagline: string;
//   // title: string;
//   // video: boolean;
//   // vote_average: number;
//   // vote_count: number;
//   // videos?: MovieTrailer;
// }

// interface Collection {
//   id: number;
//   name: string;
//   poster_path: string;
//   backdrop_path: string;
// }

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

// interface ProductionCountries {
//   iso_3166_1: string;
//   name: string;
// }

// interface SpokenLanguages {
//   english_name: string;
//   iso_639_1: string;
//   name: string;
// }

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
