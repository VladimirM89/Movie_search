import {
  useState,
  useEffect,
  FC,
  Dispatch,
  memo,
  useCallback,
  useRef,
} from "react";
import { yupResolver } from "mantine-form-yup-resolver";
import { useForm } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { getGenres, getMovies } from "../../services/apiService";
import { filtersFormSchema } from "@/utils/filtersFormSchema";
import fillYearsArray from "@/utils/fillYearsArray";
import showError from "@/utils/showError";
import compareFilterValue from "@/utils/compareFilterValue";
import { Genre } from "@/types/Response";
import { FiltersFormType } from "@/types/QueryParams";
import {
  FILTER_PARAMS_SORT_BY_MIN_YEARS,
  INITIAL_FILTER_PARAMS,
} from "@/constants/initialFormQuery";
import {
  DEBOUNCE_TIME,
  LABEL_SORT_BY,
  LABEL_VOTING,
  LABEL_YEAR,
  LOCAL_STORAGE_GENRES_KEY,
  NO_GENRES_INFO,
  PLACEHOLDER_VOTING_FROM,
  PLACEHOLDER_VOTING_TO,
  PLACEHOLDER_YEARS_ERROR,
  PLACEHOLDER_YEARS_OK,
  RESET_FILTERS_TEXT,
} from "@/constants/constants";
import sortValues from "@/constants/sortValues";
import { HTTP_STATUS_CODE } from "@/constants/enums";
import CustomNumberInput from "../CustomNumberInput";
import {
  CustomMultiSelect,
  CustomMultiSelectRef,
  CustomSelect,
} from "../CustomSelects";
import StandardButton from "../UI/Button";
import classes from "./styles.module.css";

type SearchFiltersProps = {
  handleFilters: Dispatch<FiltersFormType>;
};

const SearchFilters: FC<SearchFiltersProps> = memo(({ handleFilters }) => {
  const [genres, setGenres] = useState<Array<Genre>>([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState<boolean>(false);
  const [isGenresError, setIsGenresError] = useState<boolean>(false);
  const [years, setYears] = useState<Array<string>>([]);
  const [isLoadingYears, setIsLoadingYears] = useState<boolean>(false);
  const [isYearsError, setIsYearsError] = useState<boolean>(false);
  const [isFiltersChange, setIsFiltersChange] = useState<boolean>(false);

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoadingGenres(true);
      try {
        const data = await getGenres();
        if (!data) {
          showError(HTTP_STATUS_CODE.NOT_FOUND, NO_GENRES_INFO);
          setIsGenresError(true);
        }
        if (data && data.genres.length) {
          setGenres(data.genres);
          localStorage.setItem(
            LOCAL_STORAGE_GENRES_KEY,
            JSON.stringify(data.genres),
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          showError(error.name, error.message);
        }
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

      try {
        const data = await getMovies(FILTER_PARAMS_SORT_BY_MIN_YEARS);

        if (data && data.results.length) {
          const yearsArray = fillYearsArray(data.results);

          setYears(yearsArray);
        }
      } catch (error) {
        setIsYearsError(true);
        setYears([]);
        if (error instanceof Error) {
          showError(error.name, error.message);
        }
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

    onValuesChange: useDebouncedCallback(
      (values: FiltersFormType, previous: FiltersFormType) => {
        if (
          !Object.keys(form.errors).length &&
          !compareFilterValue(previous, values)
        ) {
          const filterParams = form.values;

          handleFilters(filterParams);
          !compareFilterValue(INITIAL_FILTER_PARAMS, values)
            ? setIsFiltersChange(true)
            : setIsFiltersChange(false);
        }
      },
      DEBOUNCE_TIME,
    ),
  });

  const handleChangeVoting = useCallback(() => {
    const minVotingValue: number = form.getInputProps("vote_average-gte").value;
    const maxVotingValue: number = form.getInputProps("vote_average-lte").value;
    minVotingValue <= maxVotingValue &&
      (form.clearFieldError("vote_average-gte"),
      form.clearFieldError("vote_average-lte"));
  }, [form]);

  const multiSelectRef = useRef<CustomMultiSelectRef>(null);

  const handleReset = useCallback(() => {
    multiSelectRef.current?.clearSelectedGenre();
    form.reset();
    setIsFiltersChange(false);
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
          ref={multiSelectRef}
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
          allowDeselect={true}
        />
        <div className={classes.voting_container}>
          <CustomNumberInput
            key={form.key("vote_average-gte")}
            {...form.getInputProps("vote_average-gte")}
            label={LABEL_VOTING}
            placeholder={PLACEHOLDER_VOTING_FROM}
            handleChangeRating={handleChangeVoting}
          />
          <CustomNumberInput
            key={form.key("vote_average-lte")}
            {...form.getInputProps("vote_average-lte")}
            placeholder={PLACEHOLDER_VOTING_TO}
            handleChangeRating={handleChangeVoting}
          />
        </div>

        <div className={classes.reset_container}>
          <StandardButton
            className={classes.reset}
            text={RESET_FILTERS_TEXT}
            onClick={handleReset}
            variant="subtle"
            disabled={!isFiltersChange}
          />
        </div>
      </div>

      <CustomSelect
        className={classes.position_right}
        key={form.key("sort_by")}
        {...form.getInputProps("sort_by")}
        label={LABEL_SORT_BY}
        defaultValue={sortValues[0].value}
        data={sortValues}
        allowDeselect={false}
      />
    </form>
  );
});

export default SearchFilters;
