import { PROXY_ENDPOINTS } from "@/constants/enums";
import {
  ERROR_MESSAGE_API_SERVICE_GENRES,
  ERROR_MESSAGE_API_SERVICE_MOVIE,
  ERROR_MESSAGE_API_SERVICE_MOVIES,
} from "@/constants/errorText";
import { MovieGenres, SearchResponse } from "@/types/Response";

export const getMovies = async (
  params: Record<string, string>,
): Promise<SearchResponse> => {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `${PROXY_ENDPOINTS.ALL_MOVIES}?${searchParams.toString()}`,
  );

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
  const searchParams = new URLSearchParams({
    id: id.toString(),
  });

  const response = await fetch(
    `${PROXY_ENDPOINTS.MOVIE}?${searchParams.toString()}`,
  );

  if (response.status >= 500 && response.status <= 599) {
    throw new Error(ERROR_MESSAGE_API_SERVICE_MOVIE);
  }

  return response.json();
};
