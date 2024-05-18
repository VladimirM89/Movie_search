import React, { FC, useState } from "react";
import {
  ComboboxLikeProps,
  MultiSelect,
  Select,
  SelectProps,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import cn from "classnames";
import { Genre } from "@/types/Response";
import {
  LABEL_GENRES,
  MAX_SELECTED_GENRES,
  PLACEHOLDER_GENRE_ERROR,
  PLACEHOLDER_GENRE_OK,
} from "@/constants/constants";
import { ArrowDownImage, ArrowUpColoredImage } from "../../../public/images";
import CustomLoader from "../UI/Loader";
import classes from "./styles.module.css";

interface CustomSelectProps extends ComboboxLikeProps, SelectProps {
  placeholder?: string;
  label: string;
  disabled?: boolean;
  isLoading?: boolean;
  defaultValue?: string;
}

export const CustomSelect: FC<CustomSelectProps> = ({
  placeholder,
  label,
  disabled,
  isLoading,
  defaultValue,
  ...props
}) => {
  const [dropdownOpened, { toggle }] = useDisclosure();

  return (
    <Select
      classNames={{
        option: classes.option,
      }}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      defaultValue={defaultValue}
      rightSection={
        !isLoading ? (
          !dropdownOpened ? (
            <ArrowDownImage />
          ) : (
            <ArrowUpColoredImage />
          )
        ) : (
          <CustomLoader size={"xs"} />
        )
      }
      withCheckIcon={false}
      searchable
      maxDropdownHeight={200}
      onDropdownOpen={toggle}
      onDropdownClose={toggle}
      {...props}
    />
  );
};

interface CustomMultiSelectProps extends ComboboxLikeProps {
  isError: boolean;
  genres: Array<Genre>;
  isLoading: boolean;
}

export const CustomMultiSelect: FC<CustomMultiSelectProps> = ({
  isError,
  genres,
  isLoading,
  ...props
}) => {
  const [dropdownOpened, { toggle }] = useDisclosure();
  const [selectedGenre, setSelectedGenre] = useState<Array<string>>([]);

  const selectHandler = (value: string) => {
    const existGenre = selectedGenre.find((item) => item === value);
    existGenre
      ? deleteGenre(value)
      : selectedGenre.length !== MAX_SELECTED_GENRES &&
        setSelectedGenre([...selectedGenre, value]);
  };

  const deleteGenre = (value: string) => {
    setSelectedGenre((current) => current.filter((item) => item !== value));
  };

  const deleteHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      selectedGenre.length &&
        deleteGenre(selectedGenre[selectedGenre.length - 1]);
    }
  };

  return (
    <MultiSelect
      classNames={{
        input: classes.multiselect_input,
        option: classes.option,
        pillsList: classes.multiselect_list_pill,
        pill: cn(
          classes.multiselect_pill,
          selectedGenre.length === MAX_SELECTED_GENRES
            ? classes.multiselect_pill_full
            : "",
        ),
      }}
      label={LABEL_GENRES}
      placeholder={
        !isError
          ? selectedGenre.length < MAX_SELECTED_GENRES
            ? PLACEHOLDER_GENRE_OK
            : ""
          : PLACEHOLDER_GENRE_ERROR
      }
      data={genres.map((item) => ({
        value: `${item.id}`,
        label: item.name,
      }))}
      onKeyDown={deleteHandler}
      onOptionSubmit={selectHandler}
      rightSection={
        !isLoading ? (
          !dropdownOpened ? (
            <ArrowDownImage />
          ) : (
            <ArrowUpColoredImage />
          )
        ) : (
          <CustomLoader size={"xs"} />
        )
      }
      maxDropdownHeight={200}
      pointer
      withCheckIcon={false}
      disabled={isError}
      maxValues={MAX_SELECTED_GENRES}
      onDropdownOpen={toggle}
      onDropdownClose={toggle}
      {...props}
    />
  );
};
