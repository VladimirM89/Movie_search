import {
  Button,
  TextInput,
  Select,
  NumberInput,
  MultiSelect,
} from "@mantine/core";
import React, { FC, memo, useCallback } from "react";
import { useForm } from "@mantine/form";

type SearchPanelProps = {
  genres: Array<string>;
  releaseYears: Array<string>;
  sortingValues: Array<{ value: string; label: string }>;
};

const SearchPanel: FC<SearchPanelProps> = memo(
  ({ genres, releaseYears, sortingValues }) => {
    // const [submittedValues, setSubmittedValues] = useState<
    //   typeof form.values | null
    // >(null);

    console.log("Render search panel");

    const form = useForm({
      mode: "uncontrolled",
      initialValues: {
        search: "",
        genre: [],
        year: "",
        minRating: "",
        maxRating: "",
        sort: "",
      },
    });

    const handleSubmit = useCallback(() => {
      console.log(form.getValues());
      // setSubmittedValues(form.getValues());

      // router.replace({
      //   query: {
      //     ...form.getValues(),
      //     genre: form.getInputProps("genre").defaultValue.toString(),
      //   },
      // });
    }, [form]);

    const handleClearFilters = useCallback(() => {
      console.log(form.getValues());
      // const searchValue = form.getInputProps("search");
      // console.log(searchValue);
      form.reset();
      // setSubmittedValues({
      //   ...form.getValues(),
      //   search: searchValue.defaultValue,
      // });
    }, [form]);

    return (
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div>
          <h2>Movie</h2>
          <TextInput
            {...form.getInputProps("search")}
            placeholder="Search movie title"
            rightSection={<Button type="submit">Search</Button>}
          />
        </div>

        <div>
          <MultiSelect
            key={form.key("genre")}
            {...form.getInputProps("genre")}
            label="Genres"
            placeholder="Select genre"
            data={genres}
            maxDropdownHeight={200}
            rightSection={"v"}
            searchable
            withCheckIcon={false}
          />

          <Select
            key={form.key("year")}
            {...form.getInputProps("year")}
            label="Release year"
            placeholder="Select release year"
            data={releaseYears}
            maxDropdownHeight={200}
            rightSection={"v"}
            searchable
          />

          <NumberInput
            key={form.key("minRating")}
            {...form.getInputProps("minRating")}
            label="Ratings"
            min={0}
            max={10}
            placeholder="From"
            allowNegative={false}
          />
          <NumberInput
            key={form.key("maxRating")}
            {...form.getInputProps("maxRating")}
            label=" "
            min={0}
            max={10}
            placeholder="To"
            allowNegative={false}
          />

          <p onClick={handleClearFilters}>Reset filters</p>
        </div>

        <Select
          key={form.key("sort")}
          {...form.getInputProps("sort")}
          label="Sort by"
          data={sortingValues}
          defaultSearchValue={sortingValues[0].label}
          rightSection={"v"}
          withCheckIcon={false}
        />
      </form>
    );
  },
);

export default SearchPanel;
