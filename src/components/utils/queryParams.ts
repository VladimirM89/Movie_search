import { Genre } from "@/models/Response";
import sortingValues from "../SearchPage/searchPageInfo";
import { FilterParams } from "@/models/QueryParams";

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

export const normalizeQueryParams = (
  obj: FilterParams,
): Record<string, string> => {
  return Object.entries(obj)
    .filter(([, value]) => !!value !== false)
    .reduce((acc, [key, value]) => {
      key.includes("-") ? (key = key.replace("-", ".")) : key;
      return { ...acc, [key]: value.toString() };
    }, {});
};
