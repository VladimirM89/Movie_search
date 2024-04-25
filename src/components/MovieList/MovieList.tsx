import MovieItem from "../MovieItem/MovieItem";

const MovieList = () => {
  return (
    <div>
      MovieList
      <ul>
        <li>
          <MovieItem />
        </li>
        <li>
          <MovieItem />
        </li>
        <li>
          <MovieItem />
        </li>
      </ul>
    </div>
  );
};

export default MovieList;
