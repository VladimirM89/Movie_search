import MovieList from "@/components/MovieList/MovieList";
import SearchBar from "@/components/SearchBar/SearchBar";
import {
  INITIAL_PAGE,
  ITEMS_PER_PAGE,
  LOCAL_STORAGE_MOVIES_KEY,
} from "@/constants/constants";
import { RatedMovie } from "@/types/Movies";
import { Loader, Pagination } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import StandardButton from "@/components/UI/Button/StandardButton";
import { useRouter } from "next/router";
import { PATH } from "@/constants/enums";

export default function RatingPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [ratedMovies, setRatedMovies] = useState<Array<RatedMovie>>([]);
  const [page, setPage] = useState<number>(INITIAL_PAGE);
  const [filteredMovies, setFilteredMovies] = useState<Array<RatedMovie>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const initialValues: Array<RatedMovie> = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_MOVIES_KEY) || "[]",
    );
    setRatedMovies(initialValues);
    setFilteredMovies(initialValues);
    setIsLoading(false);
  }, []);

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
    <Loader />
  ) : filteredMovies.length ? (
    <div>
      <div>
        <h2>Rated Movies</h2>
        <SearchBar handleSearch={setSearchValue} />
      </div>

      <div>
        <MovieList movies={getMovieOnPage()} />
        {totalPages > 1 && (
          <Pagination total={totalPages} value={page} onChange={setPage} />
        )}
      </div>
    </div>
  ) : (
    <div>
      <Image
        src="/images/notFoundRatedMovies.png"
        alt="Not found results image"
        width={311}
        height={252}
      />
      <p>You haven&apos;t rated any films yet</p>
      <StandardButton text="Find Movies" size="md" onClick={navigateToMain} />
    </div>
  );
}
