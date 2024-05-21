import {
  filtersFormSchema,
  schemaRequestMovieDetails,
} from "@/utils/filtersFormSchema";
import { InferType } from "yup";

export interface SearchParam {
  query: string;
}

export type FiltersFormType = InferType<typeof filtersFormSchema>;
export type RequestMovieDetailsApiType = InferType<
  typeof schemaRequestMovieDetails
>;
