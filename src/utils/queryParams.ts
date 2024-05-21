import { FiltersFormType } from "../types/QueryParams";

export const normalizeQueryParams = (
  obj: FiltersFormType,
): Record<string, string> => {
  return Object.entries(obj)
    .filter(([, value]) => !!value !== false)
    .reduce((acc, [key, value]) => {
      key.includes("-") ? (key = key.replace("-", ".")) : key;
      return { ...acc, [key]: value?.toString() };
    }, {});
};
