import { API_ENDPOINTS, STATUS_CODE } from "@/constants/enums";
import { ERROR_MESSAGE_PROXY_GENRES } from "@/constants/errorText";
import { MovieGenres } from "@/types/Response";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY!;

  const url = new URL(API_ENDPOINTS.GENRE, apiUrl);

  const searchParams = new URLSearchParams({ api_key: apiKey });

  // console.log(`!!!!!!!!${url}?${searchParams.toString()}`);

  try {
    const response = await fetch(`${url}?${searchParams.toString()}`, {
      method: "GET",
      cache: "no-cache",
    });

    if (response.ok) {
      const data = (await response.json()) as MovieGenres;
      res.status(STATUS_CODE.OK).json(data);
    }
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).json({
      message: `${ERROR_MESSAGE_PROXY_GENRES} ${(error as Error).message}`,
    });
  }
}
