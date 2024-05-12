import { MovieResponse } from "@/types/Response";

const fillYearsArray = (value: Array<MovieResponse>) => {
  const minYear = new Date(value[0]?.release_date).getFullYear();
  const currentYear = new Date().getFullYear();

  const yearsArray = Array.from(
    { length: currentYear - minYear + 1 },
    (_, index) => (minYear + index).toString(),
  );

  return yearsArray;
};

export default fillYearsArray;
