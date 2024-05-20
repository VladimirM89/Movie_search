const convertToShortFormat = (value: number) => {
  const length = value?.toString().length;

  if (length >= 5 && length < 7) {
    return `${Math.trunc(value / Math.pow(10, 3))}K`;
  }

  if (length >= 7) {
    const numberOfMillions = Math.trunc(value / Math.pow(10, 5));
    return `${(numberOfMillions / 10).toFixed(1)}M`;
  }

  return `${value}`;
};

export default convertToShortFormat;
