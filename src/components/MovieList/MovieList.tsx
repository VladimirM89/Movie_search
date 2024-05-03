import { Movie } from "@/models/Response";
import MovieItem from "../MovieItem/MovieItem";
import { FC } from "react";
import Image from "next/image";

type MovieListProps = {
  movies: Array<Movie>;
};

const MovieList: FC<MovieListProps> = ({ movies }) => {
  return (
    <div>
      {movies.length === 0 ? (
        <div>
          <Image
            src="/notFoundImg.png"
            alt="Not found results image"
            width={311}
            height={252}
          />
          <p>We don&apos;t have such movies, look for another one</p>
        </div>
      ) : (
        movies.map((movie) => <MovieItem key={movie.id} movieInfo={movie} />)
      )}
    </div>
  );
};

export default MovieList;
