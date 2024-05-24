import { LOCAL_STORAGE_GENRES_KEY } from "@/constants/constants";
import { Genre } from "@/types/Response";

const parseGenreIds = (value: Array<string>): string => {
  const genres = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_GENRES_KEY) || "[]",
  ) as Array<Genre>;

  const obj: Record<string, string> = genres.reduce(
    (acc, { id, name }: Genre) => ({ ...acc, [id]: name }),
    {},
  );
  const genresArray = value.map((item) => obj[item]);
  return genresArray.join(", ");
};

export default parseGenreIds;
