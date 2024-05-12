import MovieItem from "../MovieItem/MovieItem";
import { FC, memo } from "react";
import { Movie } from "@/types/Movies";

type MovieListProps = {
  movies: Array<Movie>;
};

const MovieList: FC<MovieListProps> = memo(({ movies }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movieInfo={movie} />
      ))}
    </ul>
  );
});

export default MovieList;
