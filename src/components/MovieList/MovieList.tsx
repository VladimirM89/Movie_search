import { Movie } from "@/models/Response";
import MovieItem from "../MovieItem/MovieItem";
import { FC } from "react";

type MovieListProps = {
  movies: Array<Movie>;
};

const MovieList: FC<MovieListProps> = ({ movies }) => {
  return (
    <div>
      {movies.length === 0 ? (
        <p>NOthing found</p>
      ) : (
        movies.map((movie) => <MovieItem key={movie.id} />)
      )}
    </div>
  );
};

export default MovieList;
