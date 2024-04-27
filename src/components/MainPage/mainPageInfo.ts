const sortingValues: Array<{ value: string; label: string }> = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "popularity.asc", label: "Least Popular" },
  { value: "vote_count.desc", label: "Most Rated" },
  { value: "vote_count.asc", label: "Least Rated" },
  { value: "vote_average.desc", label: "Most Voted" },
  { value: "vote_average.asc", label: "Least Voted" },
  { value: "revenue.desc", label: "Most Revenue" },
  { value: "revenue.asc", label: "Least Revenue" },
  { value: "original_title.desc", label: "Title (Z-A)" },
  { value: "original_title.asc", label: "Title (A-Z)" },
  { value: "primary_release_date.desc", label: "Release Date DECS" },
  { value: "primary_release_date.asc", label: "Release Date ACS" },
];

export default sortingValues;
