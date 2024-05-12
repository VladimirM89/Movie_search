import { CURRENCY_FORMAT, LOCALE } from "@/constants/constants";

const formatMoney = (value: number) => {
  return value.toLocaleString(LOCALE, {
    style: "currency",
    currency: CURRENCY_FORMAT,
    minimumFractionDigits: 0,
  });
};

export default formatMoney;
