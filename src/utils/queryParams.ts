import { FiltersFormType } from "../types/QueryParams";

export const normalizeQueryParams = (obj: FiltersFormType) => {
  return Object.entries(obj)
    .filter(([, value]) => !!value !== false)
    .reduce((acc, [key, value]) => {
      key.includes("-") ? (key = key.replace("-", ".")) : key;
      return { ...acc, [key]: Array.isArray(value) ? value.toString() : value };
    }, {});
};
