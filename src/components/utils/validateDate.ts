import { NO_RELEASE_YEAR } from "@/constants/constants";

const validateDate = (dateStr: string) => {
  const year = new Date(dateStr).getFullYear();
  return !isNaN(year) ? year : NO_RELEASE_YEAR;
};

export default validateDate;
