import { Dispatch, FC, SetStateAction } from "react";
import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import StandardButton from "../UI/Button";
import { SearchParam } from "../../types/QueryParams";
import SearchIcon from "../UI/SearchIcon/SearchIcon";
import classes from "./styles.module.css";

type SearchBarProps = {
  handleSearch: Dispatch<SetStateAction<string>>;
};

const SearchBar: FC<SearchBarProps> = ({ handleSearch }) => {
  // console.log("Render search bar");
  const form = useForm<SearchParam>({
    initialValues: {
      query: "",
    },
  });

  const handleSubmit = () => {
    handleSearch(form.getValues().query);
  };

  return (
    <form
      className={classes.input_container}
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <TextInput
        classNames={{
          wrapper: classes.input_wrapper,
          input: classes.input,
          section: classes.input_section,
        }}
        {...form.getInputProps("query")}
        placeholder="Search movie title"
        leftSection={<SearchIcon />}
        rightSection={<StandardButton text="Search" type="submit" />}
        rightSectionWidth={"110px"}
        radius="md"
      />
    </form>
  );
};

export default SearchBar;
