import { useState, useEffect, memo } from "react";
import MovieList from "../MovieList/MovieList";
import SearchPanel from "../SearchPanel/SearchPanel";
import { getMovies } from "../utils/api";
import { MoviesResponse } from "../../models/Response";
import { QueryParams } from "@/models/queryParams";
import sortingValues, { releaseYears } from "./mainPageInfo";

const MainPage = memo(() => {
  console.log("Render main page");

  const initialQueryParams: QueryParams = {
    sort_by: sortingValues[0].value,
  };

  const [queryParams, setQueryParams] =
    useState<QueryParams>(initialQueryParams);

  useEffect(() => {
    getMovies(queryParams).then((res: MoviesResponse) => {
      console.log(res);
      console.log(queryParams);
    });
  }, [JSON.stringify(queryParams)]);

  return (
    <div>
      <SearchPanel
        releaseYears={releaseYears}
        sortingValues={sortingValues}
        setQuery={setQueryParams}
      />
      <MovieList />
    </div>
  );
});

export default MainPage;
