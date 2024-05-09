import { API_ENDPOINTS } from "@/constants/enums";
import { MovieGenres } from "@/types/Response";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieGenres>,
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY!;

  const url = new URL(API_ENDPOINTS.GENRE, apiUrl);

  const searchParams = new URLSearchParams({ api_key: apiKey });

  // console.log(`!!!!!!!!${url}?${searchParams.toString()}`);

  const response = await fetch(`${url}?${searchParams.toString()}`, {
    method: "GET",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch data (movie's genre)");
  }

  if (response.ok) {
    const data = (await response.json()) as MovieGenres;
    res.status(200).json(data);
  }
}
