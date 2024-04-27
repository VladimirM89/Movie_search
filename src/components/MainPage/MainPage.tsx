import { useState, useEffect, memo } from "react";
import MovieList from "../MovieList/MovieList";
import SearchPanel from "../SearchPanel/SearchPanel";
import { getGenres } from "../utils/api";
import { Genre, MovieGenres } from "../../models/Response";
import sortingValues from "./mainPageInfo";

const MainPage = memo(() => {
  console.log("Render main page");
  // const [submittedValues, setSubmittedValues] = useState<
  //   typeof form.values | null
  // >(null);

  const [genres, setGenres] = useState<Array<Genre>>([]);
  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   getMovies().then((res) => {
  //     console.log("Movie list: ", res);
  //     setMovies(res);
  //   });
  // }, []);

  useEffect(() => {
    getGenres().then((res: MovieGenres) => {
      setGenres(res.genres);
      console.log("Genres: ", res.genres);
    });
  }, []);

  const releaseYears = [
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
  ];

  return (
    <div>
      <SearchPanel
        genres={genres.map((item) => item.name)}
        releaseYears={releaseYears}
        sortingValues={sortingValues}
      />
      <MovieList />
    </div>
  );
});

export default MainPage;
