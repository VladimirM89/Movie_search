import { API_ENDPOINTS } from "@/constants/enums";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY!;

//TODO: pass var params to fn, api will be added in proxy server
export const getMovies = async () => {
  const searchParams = new URLSearchParams({
    query: "test",
    api_key: apiKey,
    language: "en-US",
    with_genres: "14",
    primary_release_year: "2024",
    "vote_average.gte": "9",
    "vote_average.lte": "10",
    sort_by: "vote_count.asc",
    page: "1",
  });
  const url = new URL(API_ENDPOINTS.ALL_MOVIES, apiUrl);

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
