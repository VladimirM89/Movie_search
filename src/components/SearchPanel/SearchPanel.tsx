import {
  Button,
  TextInput,
  Select,
  NumberInput,
  MultiSelect,
} from "@mantine/core";
import React, { Dispatch, FC, SetStateAction, memo, useCallback } from "react";
import { useForm } from "@mantine/form";
import normalizeQueryParams from "../utils/normalizeQueryParams";
import { QueryParams } from "@/models/queryParams";

type SearchPanelProps = {
  genres: Array<string>;
  releaseYears: Array<string>;
  sortingValues: Array<{ value: string; label: string }>;
  setQuery: Dispatch<SetStateAction<QueryParams>>;
};

const SearchPanel: FC<SearchPanelProps> = memo(
  ({ genres, releaseYears, sortingValues, setQuery }) => {
    console.log("Render search panel");

    const form = useForm({
      mode: "uncontrolled",
      initialValues: {
        query: "",
        with_genres: [],
        primary_release_year: "",
        "vote_average-lte": "",
        "vote_average-gte": "",
        sort_by: "",
      },
    });

    const handleSubmit = useCallback(() => {
      console.log("query params:", form.getValues());
      const queryParams = normalizeQueryParams({
        ...form.getValues(),
        with_genres: form.getInputProps("with_genres").defaultValue.toString(),
      });

      console.log("normalize query: ", queryParams);

      setQuery(queryParams);
    }, []);

    const handleClearFilters = useCallback(() => {
      form.reset();
    }, [form]);

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
            data={genres}
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
          data={sortingValues}
          defaultSearchValue={sortingValues[0].label}
          rightSection={"v"}
          withCheckIcon={false}
        />
      </form>
    );
  },
);

export default SearchPanel;
