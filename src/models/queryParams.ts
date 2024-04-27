export interface QueryParams {
  query?: string;
  language?: string;
  with_genres?: string;
  primary_release_year?: string;
  "vote_average.gte"?: string;
  "vote_average.lte"?: string;
  sort_by?: string;
  page?: string;
}
