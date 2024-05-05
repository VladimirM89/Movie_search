import { useState, useEffect, memo } from "react";
import MovieList from "../MovieList/MovieList";
import { getMovies } from "../utils/api";
import { SearchResponse } from "../../types/Response";
import SearchFilters from "../SearchFilters/SearchFilters";
import { INITIAL_FILTER_PARAMS } from "@/constants/initialFormQuery";
import { FilterParams } from "@/types/QueryParams";
import { normalizeQueryParams } from "../utils/queryParams";
import { Loader, Pagination } from "@mantine/core";
import { API_MAX_REQUEST_PAGE, INITIAL_PAGE } from "@/constants/constants";
import { Movie } from "@/types/Movies";
import Image from "next/image";

const SearchPage = memo(() => {
  console.log("Render main page");

  const [filterParams, setFilterParams] = useState<FilterParams>(
    INITIAL_FILTER_PARAMS,
  );
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(INITIAL_PAGE);

  useEffect(() => {
    setIsLoading(true);
    const normalizedQueryParams = normalizeQueryParams({
      ...filterParams,
    });
    getMovies(normalizedQueryParams)
      .then((res: SearchResponse) => {
        console.log(res);
        setMovies(res.results);
        setTotalPages(
          res.total_pages > API_MAX_REQUEST_PAGE
            ? API_MAX_REQUEST_PAGE
            : res.total_pages,
        );
      })
      .finally(() => setIsLoading(false));
  }, [filterParams]);

  const handleChangePage = (value: number): void => {
    setFilterParams({ ...filterParams, page: value.toString() });
    setPage(value);
  };

  const handleChangeFilter = (params: FilterParams): void => {
    setFilterParams({ ...params, page: INITIAL_PAGE.toString() });
    setPage(INITIAL_PAGE);
  };

  return (
    <div>
      <h2>Movie</h2>
      <SearchFilters handleFilters={handleChangeFilter} />
      {isLoading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <>
          <MovieList movies={movies} />
          {totalPages > 1 && (
            <Pagination
              total={totalPages}
              onChange={handleChangePage}
              value={page}
            />
          )}
        </>
      ) : (
        <div>
          <Image
            src="/notFoundMovies.png"
            alt="Not found results image"
            width={311}
            height={252}
          />
          <p>We don&apos;t have such movies, look for another one</p>
        </div>
      )}
    </div>
  );
});

export default SearchPage;
