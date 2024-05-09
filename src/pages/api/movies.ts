import { API_ENDPOINTS, STATUS_CODE } from "@/constants/enums";
import { ERROR_MESSAGE_PROXY_MOVIES } from "@/constants/errorText";
import { SearchResponse } from "@/types/Response";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY!;

  const url = new URL(API_ENDPOINTS.ALL_MOVIES, apiUrl);
  const { query } = req;

  const searchParams = new URLSearchParams({ api_key: apiKey, ...query });

  console.log(`${url}?${searchParams.toString()}`);

  try {
    const response = await fetch(`${url}?${searchParams.toString()}`, {
      method: "GET",
      cache: "no-cache",
    });

    if (response.ok) {
      const data = (await response.json()) as SearchResponse;
      res.status(STATUS_CODE.OK).json(data);
    }
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).json({
      message: `${ERROR_MESSAGE_PROXY_MOVIES} ${(error as Error).message}`,
    });
  }
}
