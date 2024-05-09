import { API_ENDPOINTS, STATUS_CODE } from "@/constants/enums";
import { ERROR_MESSAGE_PROXY_MOVIE } from "@/constants/errorText";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY!;

  const url = new URL(API_ENDPOINTS.MOVIE, apiUrl);
  const {
    query: { id },
  } = req;

  const searchParams = new URLSearchParams({
    api_key: apiKey,
    append_to_response: "videos",
  });

  // console.log(`PROXY !!!!!!!!!!!${url}/${id}?${searchParams.toString()}`);

  try {
    const response = await fetch(`${url}/${id}?${searchParams.toString()}`, {
      method: "GET",
      cache: "no-cache",
    });

    const data = await response.json();

    if (response.status === 404) {
      return res.status(response.status).json(data);
    }

    if (response.ok) {
      return res.status(STATUS_CODE.OK).json(data);
    }
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).json({
      message: `${ERROR_MESSAGE_PROXY_MOVIE} ${(error as Error).message}`,
    });
  }
}
