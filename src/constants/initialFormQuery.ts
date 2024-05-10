import sortingValues from "@/components/SearchPage/searchPageInfo";
import { FilterParams, SearchParam } from "@/types/QueryParams";

export const INITIAL_SEARCH_VALUE: SearchParam = {
  query: "",
};

export const INITIAL_FILTER_PARAMS: FilterParams = {
  with_genres: [],
  primary_release_year: null,
  "vote_average-lte": "",
  "vote_average-gte": "",
  sort_by: sortingValues[0].value,
};
export const FILTER_PARAMS_SORT_BY_MIN_YEARS: Pick<FilterParams, "sort_by"> = {
  sort_by: sortingValues[sortingValues.length - 1].value,
};
