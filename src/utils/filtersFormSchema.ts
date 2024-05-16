import { MAX_RATING_VALUE, MIN_RATING_VALUE } from "@/constants/constants";
import {
  VALIDATION_MAX_RATING_POSITIVE,
  VALIDATION_MIN_RATING_POSITIVE,
  VALIDATION_RATING_MAX_LESS_THAN_MIN,
  VALIDATION_RATING_MAX_VALUE,
  VALIDATION_RATING_MIN_VALUE,
  VALIDATION_RATING_MIN_MORE_THAN_MAX,
  VALIDATION_YEAR_POSITIVE,
  VALIDATION_PAGE_POSITIVE,
  VALIDATION_MIN_PAGE_VALUE,
  VALIDATION_ID_POSITIVE,
  VALIDATION_ID_REQUIRED,
} from "@/constants/errorText";
import sortValues from "@/constants/sortValues";
import { object, string, number, InferType, array, lazy } from "yup";

const baseSchema = object().shape(
  {
    primary_release_year: number()
      .positive(VALIDATION_YEAR_POSITIVE)
      .max(new Date().getFullYear())
      .optional()
      .nullable(),
    "vote_average-gte": lazy((value) => {
      if (typeof value === "number") {
        return number()
          .positive(VALIDATION_MIN_RATING_POSITIVE)
          .min(MIN_RATING_VALUE, VALIDATION_RATING_MIN_VALUE)
          .max(MAX_RATING_VALUE, VALIDATION_RATING_MAX_VALUE)
          .when("vote_average-lte", ([voteAverageLte], schema) => {
            return voteAverageLte
              ? schema.lessThan(
                  voteAverageLte,
                  VALIDATION_RATING_MIN_MORE_THAN_MAX,
                )
              : schema;
          })
          .optional();
      }
      return string();
    }),
    "vote_average-lte": lazy((value) => {
      if (typeof value === "number") {
        return number()
          .positive(VALIDATION_MAX_RATING_POSITIVE)
          .min(MIN_RATING_VALUE, VALIDATION_RATING_MIN_VALUE)
          .max(MAX_RATING_VALUE, VALIDATION_RATING_MAX_VALUE)
          .when("vote_average-gte", ([voteAverageGte], schema) => {
            return voteAverageGte
              ? schema.moreThan(
                  voteAverageGte,
                  VALIDATION_RATING_MAX_LESS_THAN_MIN,
                )
              : schema;
          })
          .optional();
      }
      return string();
    }),
    sort_by: string()
      .oneOf(sortValues.map((item) => item.value))
      .optional()
      .default(() => sortValues[0].value),
    page: number()
      .positive(VALIDATION_PAGE_POSITIVE)
      .min(1, VALIDATION_MIN_PAGE_VALUE)
      .optional(),
  },
  [["vote_average-gte", "vote_average-lte"]],
);

export const filtersFormSchema = baseSchema.shape({
  with_genres: array(string().required()).optional(),
});

export const schemaRequestMovies = baseSchema.shape({
  with_genres: string().optional(),
});

export const schemaRequestMovieDetails = object({
  id: number()
    .positive(VALIDATION_ID_POSITIVE)
    .required(VALIDATION_ID_REQUIRED),
});

export type FiltersFormType = InferType<typeof filtersFormSchema>;
export type RequestMovieDetailsApiType = InferType<
  typeof schemaRequestMovieDetails
>;
