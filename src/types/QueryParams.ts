export interface FilterParams {
  with_genres?: Array<string>;
  primary_release_year?: string | null;
  "vote_average-gte"?: string;
  "vote_average-lte"?: string;
  sort_by?: string;
  page?: string;
}

export interface SearchParam {
  query: string;
}

export interface SortParam {
  sort_by: Array<{ value: string; label: string }>;
}
