import {
  API_ENDPOINTS,
  HTTP_METHOD,
  HTTP_STATUS_CODE,
} from "@/constants/enums";
import { ERROR_MESSAGE_PROXY_MOVIE } from "@/constants/errorText";
import validate from "@/middleware/validate";
import {
  RequestMovieDetailsApiType,
  schemaRequestMovieDetails,
} from "@/utils/filtersFormSchema";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY!;

  const url = new URL(API_ENDPOINTS.MOVIE, apiUrl);

  const requestParams: RequestMovieDetailsApiType = req.body;

  const searchParams = new URLSearchParams({
    // api_key: apiKey,
    append_to_response: "videos",
  });

  try {
    const response = await fetch(
      `${url}/${requestParams.id}?${searchParams.toString()}`,
      {
        method: HTTP_METHOD.GET,
        cache: "no-cache",
        headers: {
          accept: "application/json",
          Authorization: apiKey,
        },
      },
    );

    const data = await response.json();

    if (response.status === HTTP_STATUS_CODE.NOT_FOUND) {
      return res.status(response.status).json(data);
    }

    if (response.ok) {
      return res.status(HTTP_STATUS_CODE.OK).json(data);
    }
  } catch (error) {
    return res.status(HTTP_STATUS_CODE.SERVER_ERROR).json({
      message: `${ERROR_MESSAGE_PROXY_MOVIE} ${(error as Error).message}`,
    });
  }
}

export default validate(schemaRequestMovieDetails, handler);
