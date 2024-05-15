import { FC } from "react";
import { ComboboxLikeProps, MultiSelect, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Genre } from "@/types/Response";
import {
  LABEL_GENRES,
  PLACEHOLDER_GENRE_ERROR,
  PLACEHOLDER_GENRE_OK,
} from "@/constants/constants";
import { ArrowDownImage, ArrowUpColoredImage } from "../../../public/images";
import CustomLoader from "../UI/Loader";
import classes from "./styles.module.css";

interface CustomSelectProps extends ComboboxLikeProps {
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
      allowDeselect={false}
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

  return (
    <MultiSelect
      classNames={{
        input: classes.multiselect_input,
        option: classes.option,
        pillsList: classes.multiselect_list_pill,
        pill: classes.multiselect_pill,
      }}
      label={LABEL_GENRES}
      placeholder={!isError ? PLACEHOLDER_GENRE_OK : PLACEHOLDER_GENRE_ERROR}
      data={genres.map((item) => ({
        value: `${item.id}`,
        label: item.name,
      }))}
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
      searchable
      withCheckIcon={false}
      disabled={isError}
      maxValues={2}
      onDropdownOpen={toggle}
      onDropdownClose={toggle}
      {...props}
    />
  );
};
