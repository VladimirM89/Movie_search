import SearchBar from "@/components/SearchBar/SearchBar";
import {
  ITEMS_PER_PAGE,
  LOCAL_STORAGE_MOVIES_KEY,
} from "@/constants/constants";
import { RatedMovie } from "@/models/RatedMovie";
import { Pagination } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Rating() {
  const initialValues: Array<RatedMovie> = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_MOVIES_KEY) || "[]",
  );

  const totalPages = Math.ceil(initialValues.length / ITEMS_PER_PAGE);

  const [searchValue, setSearchValue] = useState<string>("");
  const [ratedMovies, setRatedMovies] =
    useState<Array<RatedMovie>>(initialValues);

  useEffect(() => {
    const filteredMovies = ratedMovies.filter((item) =>
      item.original_title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setRatedMovies(filteredMovies);
  }, [searchValue]);

  return (
    <div>
      <div>
        <h2>Rated Movies</h2>
        <SearchBar handleSearch={setSearchValue} />
      </div>
      {ratedMovies.length > 0 && (
        <>
          {/* <MovieList movies={ratedMovies} /> */}
          {totalPages > 1 && <Pagination total={totalPages} />}
        </>
      )}
    </div>
  );
}
