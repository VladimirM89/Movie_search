import { SearchParam } from "@/types/QueryParams";
import { FiltersFormType } from "@/types/QueryParams";
import sortValues from "./sortValues";
import { LOCALE } from "./constants";

export const INITIAL_SEARCH_VALUE: SearchParam = {
  query: "",
};

export const INITIAL_FILTER_PARAMS: FiltersFormType = {
  with_genres: [],
  primary_release_year: null,
  "vote_average-lte": "",
  "vote_average-gte": "",
  sort_by: sortValues[0].value,
  language: LOCALE,
};
export const FILTER_PARAMS_SORT_BY_MIN_YEARS: Pick<FiltersFormType, "sort_by"> =
  {
    sort_by: sortValues[sortValues.length - 1].value,
  };
