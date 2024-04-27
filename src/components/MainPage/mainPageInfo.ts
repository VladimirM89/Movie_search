const sortingValues: Array<{ value: string; label: string }> = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "popularity.asc", label: "Least Popular" },
  { value: "vote_count.desc", label: "Most Voted" },
  { value: "vote_count.asc", label: "Least Voted" },
  { value: "vote_average.desc", label: "Most Rated" },
  { value: "vote_average.asc", label: "Least Rated" },
  { value: "revenue.desc", label: "Most Revenue" },
  { value: "revenue.asc", label: "Least Revenue" },
  { value: "original_title.desc", label: "Title (Z-A)" },
  { value: "original_title.asc", label: "Title (A-Z)" },
  { value: "primary_release_date.desc", label: "Release Date DECS" },
  { value: "primary_release_date.asc", label: "Release Date ACS" },
];

export const releaseYears = [
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
];

export default sortingValues;
