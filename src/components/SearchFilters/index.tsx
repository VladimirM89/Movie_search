import { useState, useEffect, FC, Dispatch, memo, useCallback } from "react";
import { yupResolver } from "mantine-form-yup-resolver";
import { useForm } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { getGenres, getMovies } from "../../services/apiService";
import { FiltersFormType, filtersFormSchema } from "@/utils/filtersFormSchema";
import fillYearsArray from "@/utils/fillYearsArray";
import { Genre } from "@/types/Response";
import {
  FILTER_PARAMS_SORT_BY_MIN_YEARS,
  INITIAL_FILTER_PARAMS,
} from "@/constants/initialFormQuery";
import {
  DEBOUNCE_TIME,
  LABEL_RATINGS,
  LABEL_SORT_BY,
  LABEL_YEAR,
  LOCAL_STORAGE_GENRES_KEY,
  PLACEHOLDER_RATING_FROM,
  PLACEHOLDER_RATING_TO,
  PLACEHOLDER_YEARS_ERROR,
  PLACEHOLDER_YEARS_OK,
  RESET_FILTERS_TEXT,
} from "@/constants/constants";
import sortValues from "@/constants/sortValues";
import CustomNumberInput from "../CustomNumberInput";
import { CustomMultiSelect, CustomSelect } from "../CustomSelects";
import classes from "./styles.module.css";

type SearchFiltersProps = {
  // filters: FiltersFormType;
  handleFilters: Dispatch<FiltersFormType>;
};

// TODO: optimize component rendering. Add update years when filters are changed?
const SearchFilters: FC<SearchFiltersProps> = memo(({ handleFilters }) => {
  const [genres, setGenres] = useState<Array<Genre>>([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState<boolean>(false);
  const [isGenresError, setIsGenresError] = useState<boolean>(false);
  const [years, setYears] = useState<Array<string>>([]);
  const [isLoadingYears, setIsLoadingYears] = useState<boolean>(false);
  const [isYearsError, setIsYearsError] = useState<boolean>(false);

  // const refYear = useRef<HTMLInputElement>(null);

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
      } catch (error) {
        notifications.show({
          title: (error as Error).name,
          message: (error as Error).message,
        });
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
      // const normalizedFilterParams = normalizeQueryParams({
      //   ...filters,
      //   ...FILTER_PARAMS_SORT_BY_MIN_YEARS,
      // });

      try {
        const data = await getMovies({
          // ...filters,
          ...FILTER_PARAMS_SORT_BY_MIN_YEARS,
        });

        // console.log(normalizedFilterParams);

        if (data && data.results.length) {
          const yearsArray = fillYearsArray(data.results);

          //const selectedYear = refYear.current?.value || "";

          // !yearsArray.includes(selectedYear) &&
          //  selectedYear?.length &&
          //  yearsArray.push(selectedYear!);

          setYears(yearsArray);
          //setYears(yearsArray.sort((a, b) => Number(a) - Number(b)));
        }
      } catch (error) {
        setIsYearsError(true);
        setYears([]);
        notifications.show({
          title: (error as Error).name,
          message: "Fail to fetch released years",
        });
      } finally {
        setIsLoadingYears(false);
      }
    };

    fetchReleaseYears();
  }, []);

  const form = useForm<FiltersFormType>({
    initialValues: INITIAL_FILTER_PARAMS,

    validateInputOnChange: true,
    validate: yupResolver(filtersFormSchema),

    onValuesChange: useDebouncedCallback((values, previous) => {
      if (!Object.keys(form.errors).length && !Object.is(previous, values)) {
        const filterParams = form.values;

        handleFilters(filterParams);
      }
    }, DEBOUNCE_TIME),
  });

  const handleChangeRating = useCallback(() => {
    const minRatingValue: number = form.getInputProps("vote_average-gte").value;
    const maxRatingValue: number = form.getInputProps("vote_average-lte").value;
    minRatingValue <= maxRatingValue &&
      (form.clearFieldError("vote_average-gte"),
      form.clearFieldError("vote_average-lte"));
  }, [form]);

  return (
    <form className={classes.filters_content}>
      <div className={classes.input_filters_content}>
        <CustomMultiSelect
          key={form.key("with_genres")}
          {...form.getInputProps("with_genres")}
          genres={genres}
          isError={isGenresError}
          isLoading={isLoadingGenres}
        />

        <CustomSelect
          key={form.key("primary_release_year")}
          {...form.getInputProps("primary_release_year")}
          placeholder={
            !isYearsError ? PLACEHOLDER_YEARS_OK : PLACEHOLDER_YEARS_ERROR
          }
          label={LABEL_YEAR}
          data={years}
          isLoading={isLoadingYears}
          disabled={isYearsError}
        />
        <div className={classes.rating_container}>
          <CustomNumberInput
            key={form.key("vote_average-gte")}
            {...form.getInputProps("vote_average-gte")}
            label={LABEL_RATINGS}
            placeholder={PLACEHOLDER_RATING_FROM}
            handleChangeRating={handleChangeRating}
          />
          <CustomNumberInput
            key={form.key("vote_average-lte")}
            {...form.getInputProps("vote_average-lte")}
            placeholder={PLACEHOLDER_RATING_TO}
            handleChangeRating={handleChangeRating}
          />
        </div>

        <p
          className={classes.reset}
          onClick={() => {
            form.reset();
            console.log(form.getValues());
          }}
        >
          {RESET_FILTERS_TEXT}
        </p>
      </div>

      <CustomSelect
        key={form.key("sort_by")}
        {...form.getInputProps("sort_by")}
        label={LABEL_SORT_BY}
        defaultValue={sortValues[0].value}
        data={sortValues}
      />
    </form>
  );
});

export default SearchFilters;
