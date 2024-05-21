import { FC } from "react";
import { Movie } from "@/types/Movies";
import MovieItem from "../MovieItem";
import classes from "./styles.module.css";

type MovieListProps = {
  movies: Array<Movie>;
};

const MovieList: FC<MovieListProps> = ({ movies }) => {
  return (
    <ul className={classes.cards_container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movieInfo={movie} />
      ))}
    </ul>
  );
};

export default MovieList;
