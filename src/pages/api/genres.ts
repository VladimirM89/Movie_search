import {
  API_ENDPOINTS,
  HTTP_METHOD,
  HTTP_STATUS_CODE,
} from "@/constants/enums";
import { ERROR_MESSAGE_PROXY_GENRES } from "@/constants/errorText";
import { MovieGenres } from "@/types/Response";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY!;

  const url = new URL(API_ENDPOINTS.GENRE, apiUrl);

  try {
    const response = await fetch(url, {
      method: HTTP_METHOD.GET,
      cache: "no-cache",
      headers: {
        accept: "application/json",
        Authorization: apiKey,
      },
    });

    if (response.ok) {
      const data = (await response.json()) as MovieGenres;
      res.status(HTTP_STATUS_CODE.OK).json(data);
    }
  } catch (error) {
    return res.status(HTTP_STATUS_CODE.SERVER_ERROR).json({
      message: `${ERROR_MESSAGE_PROXY_GENRES} ${(error as Error).message}`,
    });
  }
}
