const getFullYear = (dateStr: string) => {
  const year = new Date(dateStr).getFullYear();
  return year;
};

export default getFullYear;
