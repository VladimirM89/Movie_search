import { MultiSelect, Select, NumberInput } from "@mantine/core";
import sortingValues, { releaseYears } from "../SearchPage/searchPageInfo";
import { useForm } from "@mantine/form";
import { FilterParams } from "@/models/QueryParams";
import { Genre, MovieGenres } from "@/models/Response";
import { useState, useEffect, FC, Dispatch } from "react";
import { getGenres } from "../utils/api";
import classes from "./SearchFilters.module.css";
import { useDebouncedCallback } from "@mantine/hooks";
import { getGenreParam } from "../utils/queryParams";
import { INITIAL_FILTER_PARAMS } from "@/constants/initialFormQuery";

type SearchFiltersProps = {
  handleFilters: Dispatch<FilterParams>;
};

const SearchFilters: FC<SearchFiltersProps> = ({ handleFilters }) => {
  const [genres, setGenres] = useState<Array<Genre>>([]);
  // const [sortParam, setSortParam] = useState<{
  //   value: string;
  //   label: string;
  // }>(sortingValues[0]);

  useEffect(() => {
    getGenres().then((res: MovieGenres) => {
      setGenres(res.genres);
    });
  }, []);

  //TODO: find bug
  const compareVoteAverage = (): boolean => {
    const ratingFrom: number = form.getInputProps("vote_average-gte").value;
    const ratingTo: number = form.getInputProps("vote_average-lte").value;

    // console.log("ratingFrom ", ratingFrom, "ratingTo", ratingTo);

    if (ratingTo === 0 && ratingFrom > 0) {
      return false;
    }
    return ratingTo && ratingFrom >= ratingTo ? false : true;
  };

  //TODO: separate interfaces for form and for query: Array<string> for form, string for query
  const form = useForm<FilterParams>({
    initialValues: INITIAL_FILTER_PARAMS,
    // {
    //   with_genres: [],
    //   primary_release_year: "",
    //   "vote_average-gte": "",
    //   "vote_average-lte": "",
    //   sort_by: "",
    // },

    validateInputOnChange: true,
    validate: {
      "vote_average-gte": () =>
        !compareVoteAverage() ? "Should less than Rating TO" : null,

      "vote_average-lte": () =>
        !compareVoteAverage() ? "Should more than Rating FROM" : null,
    },

    onValuesChange: useDebouncedCallback((values, previous) => {
      console.log("previous: ", previous, "values: ", values);
      // console.log("errors: ", !!Object.keys(form.errors).length);
      if (!Object.keys(form.errors).length && !Object.is(previous, values)) {
        const rawParams = form.values;

        const genreArray = getGenreParam(genres, rawParams.with_genres || []);

        //TODO: separate interfaces for form and for query
        // console.log("!!!!!!!!!!!", { ...rawParams, with_genres: [genreArray] });
        handleFilters({
          ...rawParams,
          with_genres: [genreArray],
        });
      }
    }, 1000),
  });

  const handleClearFilters = () => {
    form.reset();
    handleFilters(form.getValues());
  };

  return (
    <form>
      <MultiSelect
        classNames={{ pill: classes.pill }}
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
      {/* // TODO: find bug with clear value */}
      <Select
        classNames={{ option: classes.option }}
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
      {/* // TODO: find bug with default value */}
      <Select
        key={form.key("sort_by")}
        {...form.getInputProps("sort_by")}
        label="Sort by"
        defaultValue={sortingValues[0].value}
        data={sortingValues}
        rightSection={"v"}
        withCheckIcon={false}
        allowDeselect={false}
      />
    </form>
  );
};

export default SearchFilters;
