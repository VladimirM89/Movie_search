import { useState, useEffect, memo } from "react";
import MovieList from "../MovieList/MovieList";
import SearchPanel from "../SearchPanel/SearchPanel";
import { getGenres, getMovies } from "../utils/api";
import { Genre, MovieGenres, MoviesResponse } from "../../models/Response";
import sortingValues from "./mainPageInfo";
import { QueryParams } from "@/models/queryParams";

const MainPage = memo(() => {
  console.log("Render main page");

  const [genres, setGenres] = useState<Array<Genre>>([]);
  const [queryParams, setQueryParams] = useState<QueryParams>({});

  useEffect(() => {
    getGenres().then((res: MovieGenres) => {
      setGenres(res.genres);
    });
  }, []);

  useEffect(() => {
    getMovies(queryParams).then((res: MoviesResponse) => {
      console.log(res);
    });
  }, [JSON.stringify(queryParams)]);

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
        setQuery={setQueryParams}
      />
      <MovieList />
    </div>
  );
});

export default MainPage;
