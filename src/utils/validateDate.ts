const validateDate = (dateStr: string) => {
  const year = new Date(dateStr);
  return year.toString() !== "Invalid Date";
};

export default validateDate;
