import {
  Button,
  TextInput,
  Select,
  NumberInput,
  MultiSelect,
} from "@mantine/core";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useForm } from "@mantine/form";
import { QueryParams } from "@/models/queryParams";
import { Genre, MovieGenres } from "@/models/Response";
import { getGenres } from "../utils/api";
import {
  getGenreParam,
  getSortParam,
  normalizeQueryParams,
} from "../utils/queryParams";

type SearchPanelProps = {
  releaseYears: Array<string>;
  sortingValues: Array<{ value: string; label: string }>;
  setQuery: Dispatch<SetStateAction<QueryParams>>;
};

interface FormValues {
  query: string;
  with_genres: Array<string>;
  primary_release_year: string;
  "vote_average-lte": string;
  "vote_average-gte": string;
  sort_by: string;
}

const SearchPanel: FC<SearchPanelProps> = memo(
  ({ releaseYears, sortingValues, setQuery }) => {
    console.log("Render search panel");

    const [genres, setGenres] = useState<Array<Genre>>([]);

    useEffect(() => {
      getGenres().then((res: MovieGenres) => {
        setGenres(res.genres);
      });
    }, []);

    const form = useForm<FormValues>({
      mode: "uncontrolled",
      initialValues: {
        query: "",
        with_genres: [],
        primary_release_year: "",
        "vote_average-lte": "",
        "vote_average-gte": "",
        sort_by: sortingValues[0].label,
      },
    });

    const handleSubmit = useCallback(() => {
      console.log("query params:", form.getValues());

      const genreId = getGenreParam(
        genres,
        form.getInputProps("with_genres").defaultValue,
      );

      const sortValue = getSortParam(
        form.getInputProps("sort_by").defaultValue,
      );

      const queryParams = normalizeQueryParams({
        ...form.getValues(),
        with_genres: genreId,
        sort_by: sortValue,
      });

      console.log("normalize query: ", queryParams);

      setQuery(queryParams);
    }, [form, genres, setQuery]);

    const handleClearFilters = useCallback(() => {
      form.reset();
      const queryParams = normalizeQueryParams({
        ...form.getValues(),
        with_genres: form.getInputProps("with_genres").defaultValue.toString(),
      });
      setQuery(queryParams);
    }, [form, setQuery]);

    return (
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div>
          <h2>Movie</h2>
          <TextInput
            key={form.key("query")}
            {...form.getInputProps("query")}
            placeholder="Search movie title"
            rightSection={<Button type="submit">Search</Button>}
          />
        </div>

        <div>
          <MultiSelect
            key={form.key("with_genres")}
            {...form.getInputProps("with_genres")}
            label="Genres"
            placeholder="Select genre"
            data={genres.map((item) => item.name)}
            maxDropdownHeight={200}
            rightSection={"v"}
            searchable
            withCheckIcon={false}
          />

          <Select
            key={form.key("primary_release_year")}
            {...form.getInputProps("primary_release_year")}
            label="Release year"
            placeholder="Select release year"
            data={releaseYears}
            maxDropdownHeight={200}
            rightSection={"v"}
            searchable
            withCheckIcon={false}
          />

          <NumberInput
            key={form.key("vote_average-gte")}
            {...form.getInputProps("vote_average-gte")}
            label="Ratings"
            min={0}
            max={10}
            step={0.1}
            placeholder="From"
            allowNegative={false}
          />
          <NumberInput
            key={form.key("vote_average-lte")}
            {...form.getInputProps("vote_average-lte")}
            label=" "
            min={0}
            max={10}
            step={0.1}
            placeholder="To"
            allowNegative={false}
          />

          <p onClick={handleClearFilters}>Reset filters</p>
        </div>

        <Select
          key={form.key("sort_by")}
          {...form.getInputProps("sort_by")}
          label="Sort by"
          data={sortingValues.map((item) => item.label)}
          rightSection={"v"}
          withCheckIcon={false}
          allowDeselect={false}
        />
      </form>
    );
  },
);

export default SearchPanel;
