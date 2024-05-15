import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Pagination, Title } from "@mantine/core";
import useRatedMoviesLocalStorage from "@/hooks/useRatedMoviesLocalStorage";
import {
  INITIAL_PAGE,
  LOCAL_STORAGE_MOVIES_KEY,
  ITEMS_PER_PAGE,
  RATED_PAGE_TITLE,
  NO_RATED_MOVIES_TEXT,
  ALT_NO_RATED_MOVIES,
  BUTTON_FIND_MOVIES,
} from "@/constants/constants";
import { PATH } from "@/constants/enums";
import { RatedMovie } from "@/types/Movies";
import MovieList from "../MovieList";
import SearchBar from "../SearchBar";
import StandardButton from "../UI/Button";
import CustomLoader from "../UI/Loader";
import NotFound from "../NotFound";
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

  const getMovieOnPage = useCallback(() => {
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
        <Title>{RATED_PAGE_TITLE}</Title>
        <SearchBar handleSearch={setSearchValue} />
      </div>

      <div className={classes.page_content}>
        <MovieList movies={getMovieOnPage()} />
        {totalPages > 1 && (
          <Pagination
            classNames={{
              root: classes.pagination_root,
            }}
            total={totalPages}
            value={page}
            onChange={setPage}
          />
        )}
      </div>
    </div>
  ) : (
    <div className={classes.not_found_container}>
      <NotFound
        img={NotFoundRatedMovieImage}
        text={NO_RATED_MOVIES_TEXT}
        alt={ALT_NO_RATED_MOVIES}
        width={399}
        height={298}
      >
        <StandardButton
          btnSize="fat"
          text={BUTTON_FIND_MOVIES}
          onClick={navigateToMain}
        />
      </NotFound>
    </div>
  );
}
