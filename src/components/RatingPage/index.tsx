import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Title } from "@mantine/core";
import useRatedMoviesLocalStorage from "@/hooks/useRatedMoviesLocalStorage";
import {
  INITIAL_PAGE,
  LOCAL_STORAGE_MOVIES_KEY,
  ITEMS_PER_PAGE,
  RATED_PAGE_TITLE,
  NO_RATED_MOVIES_TEXT,
  ALT_NO_RATED_MOVIES,
  BUTTON_FIND_MOVIES,
  NO_RESULT_ACCORDING_SEARCH_TEXT,
} from "@/constants/constants";
import { PATH } from "@/constants/enums";
import { RatedMovie } from "@/types/Movies";
import MovieList from "../MovieList";
import SearchBar from "../SearchBar";
import StandardButton from "../UI/Button";
import CustomLoader from "../UI/Loader";
import EmptyState from "../EmptyState";
import NoSearchResultWithError from "../UI/NoSearchResultWithError";
import CustomPagination from "../CustomPagination";
import { NotFoundRatedMovieImage } from "../../../public/images";
import classes from "./styles.module.css";

export default function RatingPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [ratedMovies, setRatedMovies] = useState<Array<RatedMovie>>([]);
  const [page, setPage] = useState<number>(INITIAL_PAGE);
  const [filteredMovies, setFilteredMovies] = useState<Array<RatedMovie>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { getAllItems } = useRatedMoviesLocalStorage(LOCAL_STORAGE_MOVIES_KEY);

  useEffect(() => {
    const initialValues: Array<RatedMovie> = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_MOVIES_KEY) || "[]",
    );
    setRatedMovies(initialValues);
    setFilteredMovies(initialValues);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    function storageEventHandler() {
      const existingRatedMovies = getAllItems();
      setRatedMovies(existingRatedMovies || []);
    }

    window.addEventListener("storage", storageEventHandler);
    return () => {
      window.removeEventListener("storage", storageEventHandler);
    };
  }, [getAllItems]);

  useEffect(() => {
    setPage(INITIAL_PAGE);

    const filteredMovie = ratedMovies.filter((item) =>
      item.original_title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredMovies(filteredMovie);
  }, [ratedMovies, searchValue]);

  const router = useRouter();

  const navigateToMain = useCallback(() => {
    router.push(PATH.HOME);
  }, [router]);

  const filterMovieOnPage = useCallback(() => {
    const filteredMovie = filteredMovies.filter((item) =>
      item.original_title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return filteredMovie.slice(4 * (page - 1), 4 * (page - 1) + 4);
  }, [filteredMovies, page, searchValue]);

  const totalPages = Math.ceil(
    (searchValue.length ? filteredMovies.length : ratedMovies.length) /
      ITEMS_PER_PAGE,
  );

  return isLoading ? (
    <CustomLoader />
  ) : ratedMovies.length ? (
    <div className={classes.content}>
      <div className={classes.header_content}>
        <Title className="page_title">{RATED_PAGE_TITLE}</Title>
        <SearchBar handleSearch={setSearchValue} />
      </div>

      <div className={classes.page_content}>
        {!filteredMovies.length && ratedMovies.length && (
          <NoSearchResultWithError text={NO_RESULT_ACCORDING_SEARCH_TEXT} />
        )}
        <MovieList movies={filterMovieOnPage()} />
        {totalPages > 1 && (
          <CustomPagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  ) : (
    <div className={classes.not_found_container}>
      <EmptyState
        img={NotFoundRatedMovieImage}
        text={NO_RATED_MOVIES_TEXT}
        alt={ALT_NO_RATED_MOVIES}
        width={400}
        height={300}
      >
        <StandardButton
          btnSize="fat"
          text={BUTTON_FIND_MOVIES}
          onClick={navigateToMain}
        />
      </EmptyState>
    </div>
  );
}
