import { MultiSelect, Select, NumberInput, Loader } from "@mantine/core";

import { useForm } from "@mantine/form";
import { Genre } from "@/types/Response";
import {
  useState,
  useEffect,
  FC,
  Dispatch,
  useRef,
  memo,
  useCallback,
} from "react";
import { getGenres, getMovies } from "../../services/apiService";
import classes from "./SearchFilters.module.css";
import { useDebouncedCallback } from "@mantine/hooks";
import {
  FILTER_PARAMS_SORT_BY_MIN_YEARS,
  INITIAL_FILTER_PARAMS,
} from "@/constants/initialFormQuery";
import {
  DEBOUNCE_TIME,
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
import { FiltersFormType, filtersFormSchema } from "@/utils/filtersFormSchema";
import { yupResolver } from "mantine-form-yup-resolver";
import fillYearsArray from "@/utils/fillYearsArray";
import sortValues from "@/constants/sortValues";
import { notifications } from "@mantine/notifications";

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
    <>
      <form>
        <MultiSelect
          classNames={{ pill: classes.pill }}
          key={form.key("with_genres")}
          {...form.getInputProps("with_genres")}
          label={LABEL_GENRES}
          placeholder={
            !isGenresError ? PLACEHOLDER_GENRE_OK : PLACEHOLDER_GENRE_ERROR
          }
          data={genres.map((item) => ({
            value: `${item.id}`,
            label: item.name,
          }))}
          maxDropdownHeight={200}
          rightSection={!isLoadingGenres ? "v" : <Loader size="xs" />}
          searchable
          withCheckIcon={false}
          disabled={isGenresError}
        />

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
          onValueChange={handleChangeRating}
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
          onValueChange={handleChangeRating}
        />
        <p onClick={form.reset}>Reset filters</p>
        <Select
          key={form.key("sort_by")}
          {...form.getInputProps("sort_by")}
          label={LABEL_SORT_BY}
          defaultValue={sortValues[0].value}
          data={sortValues}
          rightSection={"v"}
          withCheckIcon={false}
          allowDeselect={false}
        />
      </form>
    </>
  );
});

export default SearchFilters;
