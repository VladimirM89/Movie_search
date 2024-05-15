import { useState, useEffect, memo, useCallback } from "react";
import { Pagination, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FiltersFormType } from "@/utils/filtersFormSchema";
import { INITIAL_FILTER_PARAMS } from "@/constants/initialFormQuery";
import {
  API_MAX_REQUEST_PAGE,
  INITIAL_PAGE,
  MOVIES_TITLE,
  NOT_FOUND_MOVIES_TEXT,
  NO_INFO_MOVIE_LIST,
} from "@/constants/constants";
import { Movie } from "@/types/Movies";
import MovieList from "../MovieList";
import { getMovies } from "../../services/apiService";
import SearchFilters from "../SearchFilters";
import NotFound from "../NotFound";
import { NotFoundMoviesImage } from "../../../public/images";
import classes from "./styles.module.css";
import CustomLoader from "../UI/Loader";

const SearchPage = memo(() => {
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
        setIsMovieError(true);
        const errorWithType = error as Error;
        notifications.show({
          title: errorWithType.name,
          message: errorWithType.message,
        });
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
    <div className={classes.search_container}>
      <Title>{MOVIES_TITLE}</Title>
      <div className={classes.search_content}>
        <SearchFilters
          handleFilters={handleChangeFilter}
          // filters={deleteReleaseYearFromParams()}
        />
        {isLoading ? (
          <CustomLoader />
        ) : movies.length ? (
          <>
            <MovieList movies={movies} />
            {totalPages > 1 && (
              <Pagination
                classNames={{
                  root: classes.pagination_root,
                }}
                total={totalPages}
                onChange={handleChangePage}
                value={page}
              />
            )}
          </>
        ) : !isMovieError ? (
          <NotFound
            img={NotFoundMoviesImage}
            text={NOT_FOUND_MOVIES_TEXT}
            width={311}
            height={252}
          />
        ) : (
          <p>{NO_INFO_MOVIE_LIST}</p>
        )}
      </div>
    </div>
  );
});

export default SearchPage;
