import { LOCALE, MONTH_FORMAT } from "@/constants/constants";

const formatDate = (value: string) => {
  const date = new Date(value);
  const month = date.toLocaleString(LOCALE, { month: MONTH_FORMAT });
  const day = date.getDay();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

export default formatDate;
