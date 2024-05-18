const sortValues: Array<{ value: string; label: string }> = [
  { value: "popularity.desc", label: "Most popular" },
  { value: "popularity.asc", label: "Least popular" },
  { value: "vote_count.desc", label: "Most voted" },
  { value: "vote_count.asc", label: "Least voted" },
  { value: "vote_average.desc", label: "Most rated" },
  { value: "vote_average.asc", label: "Least rated" },
  { value: "revenue.desc", label: "Most revenue" },
  { value: "revenue.asc", label: "Least revenue" },
  { value: "original_title.desc", label: "Title (Z-A)" },
  { value: "original_title.asc", label: "Title (A-Z)" },
  { value: "primary_release_date.desc", label: "Release date DECS" },
  { value: "primary_release_date.asc", label: "Release date ACS" },
];

export default sortValues;
