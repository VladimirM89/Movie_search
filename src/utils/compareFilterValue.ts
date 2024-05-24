import { FiltersFormType } from "@/types/QueryParams";

const compareFilterValue = (obj1: FiltersFormType, obj2: FiltersFormType) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export default compareFilterValue;
