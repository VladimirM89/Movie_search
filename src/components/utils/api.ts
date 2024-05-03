import { API_ENDPOINTS } from "@/constants/enums";
import { QueryParams } from "@/models/QueryParams";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY!;

//TODO: api will be added in proxy server

export const getMovies = async (params: QueryParams) => {
  const searchParams = new URLSearchParams({
    api_key: apiKey,
    ...params,
  });
  const url = new URL(API_ENDPOINTS.ALL_MOVIES, apiUrl);
  console.log(`${url}?${searchParams.toString()}`);

  const response = await fetch(`${url}?${searchParams.toString()}`, {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch data (movie list)");
  }

  return response.json();
};

export const getGenres = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const url = new URL(API_ENDPOINTS.GENRE, apiUrl);

  const searchParams = new URLSearchParams({
    api_key: apiKey,
  });

  const response = await fetch(`${url}?${searchParams.toString()}`, {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch data (movie's genre)");
  }

  return response.json();
};

export const getMovie = async (id: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const url = new URL(API_ENDPOINTS.GENRE, apiUrl);

  const searchParams = new URLSearchParams({
    api_key: apiKey,
  });

  const response = await fetch(`${url}/${id}?${searchParams.toString()}`, {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch data (movie's details)");
  }

  return response.json();
};
