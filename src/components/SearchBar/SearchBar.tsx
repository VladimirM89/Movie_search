import { TextInput } from "@mantine/core";
import StandardButton from "../UI/Button";
import { useForm } from "@mantine/form";
import SearchIcon from "../UI/SearchIcon/SearchIcon";
import classes from "./SearchBar.module.css";
import { Dispatch, FC, SetStateAction } from "react";
import { SearchParam } from "../../types/QueryParams";

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
          wrapper: classes.inputWrapper,
          input: classes.input,
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
