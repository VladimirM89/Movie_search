import { HTTP_METHOD, PROXY_ENDPOINTS } from "@/constants/enums";
import {
  ERROR_MESSAGE_API_SERVICE_GENRES,
  ERROR_MESSAGE_API_SERVICE_MOVIE,
  ERROR_MESSAGE_API_SERVICE_MOVIES,
} from "@/constants/errorText";
import { MovieGenres, SearchResponse } from "@/types/Response";
import { FiltersFormType } from "../utils/filtersFormSchema";
import { normalizeQueryParams } from "../utils/queryParams";

export const getMovies = async (
  params: FiltersFormType,
): Promise<SearchResponse> => {
  const normalizedParams = normalizeQueryParams(params);

  const response = await fetch(PROXY_ENDPOINTS.ALL_MOVIES, {
    method: HTTP_METHOD.POST,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(normalizedParams),
  });

  if (response.status >= 500 && response.status <= 599) {
    throw new Error(ERROR_MESSAGE_API_SERVICE_MOVIES);
  }

  return response.json();
};

export const getGenres = async (): Promise<MovieGenres> => {
  const response = await fetch(PROXY_ENDPOINTS.GENRE);

  if (response.status >= 500 && response.status <= 599) {
    throw new Error(ERROR_MESSAGE_API_SERVICE_GENRES);
  }

  return response.json();
};

export const getMovie = async (id: number) => {
  const response = await fetch(PROXY_ENDPOINTS.MOVIE, {
    method: HTTP_METHOD.POST,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (response.status >= 500 && response.status <= 599) {
    throw new Error(ERROR_MESSAGE_API_SERVICE_MOVIE);
  }
  return response.json();
};
