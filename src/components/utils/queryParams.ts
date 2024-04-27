import { Genre } from "@/models/Response";
import sortingValues from "../MainPage/mainPageInfo";

export const getGenreParam = (
  genres: Array<Genre>,
  value: Array<string>,
): string => {
  const genresId: Array<Genre | undefined> = value.map((item) =>
    genres.find((genre) => genre.name === item),
  );

  return genresId.map((item) => item && item.id).toString();
};

export const getSortParam = (label: string): string => {
  const result = sortingValues.find((item) => item.label === label);
  return result ? result.value : "";
};

export const normalizeQueryParams = (obj: {
  [key: string]: string | number;
}) => {
  return Object.entries(obj)
    .filter(([, value]) => !!value !== false)
    .reduce((acc, [key, value]) => {
      key.includes("-") ? (key = key.replace("-", ".")) : key;
      return { ...acc, [key]: value };
    }, {});
};
