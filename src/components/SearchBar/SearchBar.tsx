import { TextInput } from "@mantine/core";
import StandardButton from "../UI/Button/StandardButton";
import { useForm } from "@mantine/form";
import SearchIcon from "../UI/SearchIcon/SearchIcon";
import classes from "./SearchBar.module.css";
import { Dispatch, FC, SetStateAction } from "react";
import { SearchParam } from "@/models/QueryParams";

type SearchBarProps = {
  handleSearch: Dispatch<SetStateAction<SearchParam>>;
};

const SearchBar: FC<SearchBarProps> = ({ handleSearch }) => {
  console.log("Render search bar");
  const form = useForm<SearchParam>({
    initialValues: {
      query: "",
    },
  });

  const handleSubmit = () => {
    handleSearch(form.getValues());
    console.log(form.getValues());
  };

  return (
    <form
      className={classes.input_container}
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <TextInput
        classNames={{
          wrapper: classes.inputWrapper,
          input: classes.input,
        }}
        {...form.getInputProps("query")}
        placeholder="Search movie title"
        leftSection={<SearchIcon />}
        rightSection={<StandardButton text="Search" type="submit" size="sm" />}
        rightSectionWidth={"110px"}
        radius="md"
      />
    </form>
  );
};

export default SearchBar;
