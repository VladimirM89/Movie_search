import { FiltersFormType } from "../utils/filtersFormSchema";
import { normalizeQueryParams } from "../utils/queryParams";
import {
  HTTP_METHOD,
  HTTP_STATUS_CODE,
  PROXY_ENDPOINTS,
} from "@/constants/enums";
import {
  ERROR_MESSAGE_API_SERVICE_GENRES,
  ERROR_MESSAGE_API_SERVICE_MOVIE,
  ERROR_MESSAGE_API_SERVICE_MOVIES,
  ERROR_UNHANDLED_TEXT,
} from "@/constants/errorText";
import { MovieGenres, SearchResponse } from "@/types/Response";

export const getMovies = async (
  params: FiltersFormType,
): Promise<SearchResponse> => {
  const normalizedParams = normalizeQueryParams(params);

  try {
    const response = await fetch(PROXY_ENDPOINTS.ALL_MOVIES, {
      method: HTTP_METHOD.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalizedParams),
    });

    if (response.status >= 500 && response.status <= 599) {
      throw new Error(ERROR_MESSAGE_API_SERVICE_MOVIES);
    }

    if (response.status !== HTTP_STATUS_CODE.OK) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(ERROR_UNHANDLED_TEXT);
  }
};

export const getGenres = async (): Promise<MovieGenres> => {
  try {
    const response = await fetch(PROXY_ENDPOINTS.GENRE);

    if (response.status >= 500 && response.status <= 599) {
      throw new Error(ERROR_MESSAGE_API_SERVICE_GENRES);
    }

    if (response.status !== HTTP_STATUS_CODE.OK) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(ERROR_UNHANDLED_TEXT);
  }
};

export const getMovie = async (id: number) => {
  try {
    const response = await fetch(PROXY_ENDPOINTS.MOVIE, {
      method: HTTP_METHOD.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.status >= 500 && response.status <= 599) {
      throw new Error(ERROR_MESSAGE_API_SERVICE_MOVIE);
    }

    if (response.ok || response.status === HTTP_STATUS_CODE.NOT_FOUND) {
      return response;
    }

    throw new Error(response.statusText);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(ERROR_UNHANDLED_TEXT);
  }
};
