import { useState, useEffect, memo } from "react";
import MovieList from "../MovieList/MovieList";
import { getMovies } from "../utils/api";
import { MoviesResponse } from "../../models/Response";
import SearchFilters from "../SearchFilters/SearchFilters";
import { INITIAL_FILTER_PARAMS } from "@/constants/initialFormQuery";
import { FilterParams } from "@/models/QueryParams";
import { normalizeQueryParams } from "../utils/queryParams";

const SearchPage = memo(() => {
  console.log("Render main page");

  const [filterParams, setFilterParams] = useState<FilterParams>(
    INITIAL_FILTER_PARAMS,
  );

  useEffect(() => {
    const normalizedQueryParams = normalizeQueryParams(filterParams);
    getMovies(normalizedQueryParams).then((res: MoviesResponse) => {
      console.log(res);
    });
  }, [filterParams]);

  return (
    <div>
      <h2>Movie</h2>
      <SearchFilters handleFilters={setFilterParams} />
      <MovieList />
    </div>
  );
});

export default SearchPage;
