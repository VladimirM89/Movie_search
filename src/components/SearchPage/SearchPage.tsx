import { useState, useEffect, memo } from "react";
import MovieList from "../MovieList/MovieList";
import { getMovies } from "../utils/api";
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
    const normalizedQueryParams = normalizeQueryParams({
      ...filterParams,
    });

    const fetchData = async () => {
      setIsLoading(true);
      const data = await getMovies(normalizedQueryParams);
      // console.log(data);
      setMovies(data.results);
      setTotalPages(
        data.total_pages > API_MAX_REQUEST_PAGE
          ? API_MAX_REQUEST_PAGE
          : data.total_pages,
      );
      setIsLoading(false);
    };

    fetchData();
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
      ) : movies.length ? (
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
            src="/images/notFoundMovies.png"
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
