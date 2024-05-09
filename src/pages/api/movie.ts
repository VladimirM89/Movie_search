import checkIsNumber from "@/components/utils/checkIsNumber";
import { API_ENDPOINTS } from "@/constants/enums";
import { MovieDetails } from "@/types/Movies";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieDetails>,
) {
  // console.log("CALL PROXY FN getMovie");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY!;

  const url = new URL(API_ENDPOINTS.MOVIE, apiUrl);
  const {
    query: { id },
  } = req;

  // console.log("PROXY. ID", id);

  if (id && !Array.isArray(id)) {
    if (!checkIsNumber(id)) {
      return res.status(404);
    }
  }

  const searchParams = new URLSearchParams({
    api_key: apiKey,
    append_to_response: "videos",
  });

  // console.log(`PROXY !!!!!!!!!!!${url}/${id}?${searchParams.toString()}`);

  const response = await fetch(`${url}/${id}?${searchParams.toString()}`, {
    method: "GET",
    cache: "no-cache",
  });

  const data = await response.json();

  // console.log("PROXY. RESULT FROM API: ", response.status, data);

  // if (!response.ok) {
  //   throw new Error("Unable to fetch data (movie's details)");
  // }
  return res.status(response.status).json(data);

  // if (response.ok) {
  //   // const data = (await response.json()) as MovieDetails;
  //   res.status(200).json(data);
  // }
}
