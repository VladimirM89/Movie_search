import { useState, useEffect, memo, useCallback } from "react";
import MovieList from "../MovieList/MovieList";
import { getMovies } from "../../services/apiService";
import SearchFilters from "../SearchFilters/SearchFilters";
import { INITIAL_FILTER_PARAMS } from "@/constants/initialFormQuery";
import { Loader, Pagination } from "@mantine/core";
import {
  API_MAX_REQUEST_PAGE,
  INITIAL_PAGE,
  NO_INFO_MOVIE_LIST,
} from "@/constants/constants";
import { Movie } from "@/types/Movies";
import Image from "next/image";
import { FiltersFormType } from "@/utils/filtersFormSchema";
import { notifications } from "@mantine/notifications";

const SearchPage = memo(() => {
  // console.log("Render main page");

  const [filterParams, setFilterParams] = useState<FiltersFormType>(
    INITIAL_FILTER_PARAMS,
  );
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMovieError, setIsMovieError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(INITIAL_PAGE);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getMovies(filterParams);
        if (data && data.results) {
          setMovies(data.results);
          setTotalPages(
            data.total_pages > API_MAX_REQUEST_PAGE
              ? API_MAX_REQUEST_PAGE
              : data.total_pages,
          );
        }
      } catch (error) {
        notifications.show({
          title: (error as Error).name,
          message: (error as Error).message,
        });
        setIsMovieError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filterParams]);

  const handleChangePage = useCallback(
    (value: number): void => {
      setFilterParams({ ...filterParams, page: value });
      setPage(value);
    },
    [filterParams],
  );

  const handleChangeFilter = useCallback((params: FiltersFormType): void => {
    setFilterParams({ ...params, page: INITIAL_PAGE });
    setPage(INITIAL_PAGE);
  }, []);

  // const deleteReleaseYearFromParams = useCallback(() => {
  //   // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  //   const { primary_release_year, ...rest } = filterParams;
  //   return rest;
  // }, [filterParams]);

  return (
    <div>
      <h2>Movie</h2>
      <SearchFilters
        handleFilters={handleChangeFilter}
        // filters={deleteReleaseYearFromParams()}
      />
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
      ) : !isMovieError ? (
        <div>
          <Image
            src="/images/notFoundMovies.png"
            alt="Not found results image"
            width={311}
            height={252}
          />
          <p>We don&apos;t have such movies, look for another one</p>
        </div>
      ) : (
        <p>{NO_INFO_MOVIE_LIST}</p>
      )}
    </div>
  );
});

export default SearchPage;
