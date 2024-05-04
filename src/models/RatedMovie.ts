export interface RatedMovie {
  id: number;
  genre_ids: Array<string>;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  userRating: number;
}
