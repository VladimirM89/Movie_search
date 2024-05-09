import { MovieGenres, SearchResponse } from "@/types/Response";

export const getMovies = async (
  params: Record<string, string>,
): Promise<SearchResponse> => {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(`api/movies?${searchParams.toString()}`);

  return response.json();
};

export const getGenres = async (): Promise<MovieGenres> => {
  const response = await fetch("api/genres");

  if (!response.ok) {
    throw new Error("Unable to fetch data (movie's genre)");
  }

  return response.json();
};

export const getMovie = async (id: number) => {
  // console.log("CALL API FN getMovie");

  const searchParams = new URLSearchParams({
    id: id.toString(),
  });

  try {
    const response = await fetch(`api/movie?${searchParams.toString()}`);
    // console.log("!!!!!!!!!!!", response, response.status);
    return response.json();
  } catch {
    console.error("NOT FOUND SUCH ITEM");
  }
};
