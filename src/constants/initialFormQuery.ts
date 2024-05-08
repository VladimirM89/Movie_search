import sortingValues from "@/components/SearchPage/searchPageInfo";
import { FilterParams, SearchParam } from "@/types/QueryParams";

export const INITIAL_SEARCH_VALUE: SearchParam = {
  query: "",
};

export const INITIAL_FILTER_PARAMS: FilterParams = {
  with_genres: [],
  primary_release_year: "",
  "vote_average-lte": "",
  "vote_average-gte": "",
  sort_by: sortingValues[0].value,
};
