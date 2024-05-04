const convertToShortFormat = (value: number): string => {
  if (!value) {
    return `${value}`;
  }
  const length = value.toString().length;
  if (length >= 7) {
    const numberOfMillions = Math.trunc(value / Math.pow(10, 5));
    return `${(numberOfMillions / 10).toFixed(1)}M`;
  }
  if (length < 7 && length >= 5) {
    return `${Math.trunc(value / Math.pow(10, 3))}k`;
  }
  return `${value}`;
};

export default convertToShortFormat;
