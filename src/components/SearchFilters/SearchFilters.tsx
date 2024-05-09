import { MultiSelect, Select, NumberInput, Loader } from "@mantine/core";
import sortingValues from "../SearchPage/searchPageInfo";
import { useForm } from "@mantine/form";
import { FilterParams } from "@/types/QueryParams";
import { Genre } from "@/types/Response";
import { useState, useEffect, FC, Dispatch, useRef } from "react";
import { getGenres, getMovies } from "../utils/api";
import classes from "./SearchFilters.module.css";
import { useDebouncedCallback } from "@mantine/hooks";
import { getGenreParam, normalizeQueryParams } from "../utils/queryParams";
import {
  FILTER_PARAMS_MIN_YEARS,
  INITIAL_FILTER_PARAMS,
} from "@/constants/initialFormQuery";
import {
  LABEL_GENRES,
  LABEL_RATINGS,
  LABEL_SORT_BY,
  LABEL_YEAR,
  LOCAL_STORAGE_GENRES_KEY,
  PLACEHOLDER_GENRE_ERROR,
  PLACEHOLDER_GENRE_OK,
  PLACEHOLDER_YEARS_ERROR,
  PLACEHOLDER_YEARS_OK,
} from "@/constants/constants";
import {
  VALIDATION_FORM_RATING_LESS_THAN_MIN,
  VALIDATION_FORM_RATING_MORE_THAN_MAX,
} from "@/constants/errorText";

type SearchFiltersProps = {
  // filters: FilterParams;
  handleFilters: Dispatch<FilterParams>;
};

const SearchFilters: FC<SearchFiltersProps> = ({ handleFilters }) => {
  const [genres, setGenres] = useState<Array<Genre>>([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState<boolean>(false);
  const [isGenresError, setIsGenresError] = useState<boolean>(false);
  const [years, setYears] = useState<Array<string>>([]);
  const [isLoadingYears, setIsLoadingYears] = useState<boolean>(false);
  const [isYearsError, setIsYearsError] = useState<boolean>(false);

  const refYear = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoadingGenres(true);
      try {
        const data = await getGenres();
        if (data && data.genres.length) {
          setGenres(data.genres);
          localStorage.setItem(
            LOCAL_STORAGE_GENRES_KEY,
            JSON.stringify(data.genres),
          );
        }
      } catch {
        setIsGenresError(true);
      } finally {
        setIsLoadingGenres(false);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchReleaseYears = async () => {
      setIsLoadingYears(true);
      const normalizedFilterParams = normalizeQueryParams({
        // ...filters,
        // primary_release_year: "",
        ...FILTER_PARAMS_MIN_YEARS,
      });

      try {
        const data = await getMovies(normalizedFilterParams);

        console.log(normalizedFilterParams);

        console.log(data.results);

        if (data && data.results.length) {
          const minYear = new Date(
            data?.results[0]?.release_date,
          ).getFullYear();
          const currentYear = new Date().getFullYear();

          const yearsArray = Array.from(
            { length: currentYear - minYear + 1 },
            (_, index) => (minYear + index).toString(),
          );

          // setYears(yearsArray.sort((a, b) => Number(a) - Number(b)));
          setYears(yearsArray);
          console.log(yearsArray);
        }

        // const selectedYear = form
        //   .getInputProps("primary_release_year")
        //   .value.toString();

        // const selectedYear = refYear.current?.value || "";

        // console.log("selected Year", selectedYear);

        // !yearsArray.includes(selectedYear) &&
        //   selectedYear?.length &&
        //   yearsArray.push(selectedYear!);
      } catch {
        setIsYearsError(true);
        setYears([]);
      } finally {
        setIsLoadingYears(false);
      }
    };

    fetchReleaseYears();
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

    validateInputOnChange: true,
    validate: {
      "vote_average-gte": () =>
        !compareVoteAverage() ? VALIDATION_FORM_RATING_MORE_THAN_MAX : null,

      "vote_average-lte": () =>
        !compareVoteAverage() ? VALIDATION_FORM_RATING_LESS_THAN_MIN : null,
    },

    onValuesChange: useDebouncedCallback((values, previous) => {
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
        label={LABEL_GENRES}
        placeholder={
          !isGenresError ? PLACEHOLDER_GENRE_OK : PLACEHOLDER_GENRE_ERROR
        }
        data={genres.map((item) => item.name)}
        maxDropdownHeight={200}
        rightSection={!isLoadingGenres ? "v" : <Loader size="xs" />}
        searchable
        withCheckIcon={false}
        disabled={isGenresError}
      />
      {/* // TODO: find bug with clear value */}
      <Select
        ref={refYear}
        classNames={{ option: classes.option }}
        key={form.key("primary_release_year")}
        {...form.getInputProps("primary_release_year")}
        label={LABEL_YEAR}
        placeholder={
          !isYearsError ? PLACEHOLDER_YEARS_OK : PLACEHOLDER_YEARS_ERROR
        }
        data={years}
        maxDropdownHeight={200}
        rightSection={!isLoadingYears ? "v" : <Loader size="xs" />}
        searchable
        withCheckIcon={false}
        disabled={isYearsError}
      />
      <NumberInput
        key={form.key("vote_average-gte")}
        {...form.getInputProps("vote_average-gte")}
        label={LABEL_RATINGS}
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
      <Select
        key={form.key("sort_by")}
        {...form.getInputProps("sort_by")}
        label={LABEL_SORT_BY}
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
