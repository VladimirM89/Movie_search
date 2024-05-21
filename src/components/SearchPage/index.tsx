import { useState, useEffect, useCallback } from "react";
import { Title } from "@mantine/core";
import { FiltersFormType } from "@/types/QueryParams";
import showError from "@/utils/showError";
import { INITIAL_FILTER_PARAMS } from "@/constants/initialFormQuery";
import {
  API_MAX_REQUEST_PAGE,
  INITIAL_PAGE,
  MOVIES_TITLE,
  NOT_FOUND_MOVIES_TEXT,
  ERROR_MESSAGE_FAIL_FETCHING_MOVIE_LIST,
} from "@/constants/constants";
import { Movie } from "@/types/Movies";
import MovieList from "../MovieList";
import { getMovies } from "../../services/apiService";
import SearchFilters from "../SearchFilters";
import EmptyState from "../EmptyState";
import { NotFoundMoviesImage } from "../../../public/images";
import CustomLoader from "../UI/Loader";
import NoSearchResultWithError from "../UI/NoSearchResultWithError";
import CustomPagination from "../CustomPagination";
import classes from "./styles.module.css";

const SearchPage = () => {
  const [filterParams, setFilterParams] = useState<FiltersFormType>(
    INITIAL_FILTER_PARAMS,
  );
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
        if (error instanceof Error) {
          showError(error.name, error.message);
        }
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

  return (
    <div className={classes.search_container}>
      <Title className="page_title">{MOVIES_TITLE}</Title>
      <div className={classes.search_content}>
        <SearchFilters handleFilters={handleChangeFilter} />
        {isLoading ? (
          <CustomLoader />
        ) : movies.length ? (
          <>
            <MovieList movies={movies} />
            {totalPages > 1 && (
              <CustomPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handleChangePage}
                position="flex-end"
              />
            )}
          </>
        ) : !isMovieError ? (
          <EmptyState
            img={NotFoundMoviesImage}
            text={NOT_FOUND_MOVIES_TEXT}
            width={311}
            height={252}
          />
        ) : (
          <NoSearchResultWithError
            text={ERROR_MESSAGE_FAIL_FETCHING_MOVIE_LIST}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
