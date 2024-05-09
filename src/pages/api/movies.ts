import { API_ENDPOINTS } from "@/constants/enums";
import { MovieResponse } from "@/types/Response";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieResponse>,
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY!;

  const url = new URL(API_ENDPOINTS.ALL_MOVIES, apiUrl);
  const { query } = req;

  const searchParams = new URLSearchParams({ api_key: apiKey, ...query });

  const response = await fetch(`${url}?${searchParams.toString()}`, {
    method: "GET",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch data (movie list)");
  }

  if (response.ok) {
    const data = (await response.json()) as MovieResponse;
    res.status(200).json(data);
  }
}
