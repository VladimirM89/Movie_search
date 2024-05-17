import { FC, useState } from "react";
import {
  CheckIcon,
  Combobox,
  ComboboxLikeProps,
  Group,
  Input,
  InputBase,
  Pill,
  PillsInput,
  ScrollArea,
  useCombobox,
} from "@mantine/core";
import { Genre } from "@/types/Response";
import { useDisclosure } from "@mantine/hooks";
import {
  LABEL_GENRES,
  PLACEHOLDER_GENRE_ERROR,
  PLACEHOLDER_GENRE_OK,
} from "@/constants/constants";
import { ArrowDownImage, ArrowUpColoredImage } from "../../../public/images";
import CustomLoader from "../UI/Loader";

const MAX_DISPLAYED_VALUES = 2;

interface CustomMultiSelectProps extends ComboboxLikeProps {
  isError: boolean;
  genres: Array<Genre>;
  isLoading: boolean;
}

const CustomMultiSelect: FC<CustomMultiSelectProps> = ({
  isError,
  genres,
  isLoading,
  ...props
}) => {
  // const [dropdownOpened, { toggle }] = useDisclosure();
  const combobox = useCombobox({
    onDropdownClose: () => {
      // combobox.toggleDropdown();
      combobox.resetSelectedOption();
    },
    onDropdownOpen: () => {
      // combobox.toggleDropdown();
      combobox.updateSelectedOptionIndex("active");
    },
  });

  const [genre, setGenre] = useState<Array<Genre>>([]);
  const [search, setSearch] = useState("");

  const handleGenreSelect = (val: string) =>
    setGenre((current) => {
      console.log(val, current);
      const newValue = current.find((item) => item.name === val)!;
      console.log(newValue);
      if (!newValue) {
        const genreToAdd = genres.find((item) => item.name === val)!;
        console.log(genreToAdd);
        return [...current, genreToAdd];
      }
      console.log(current.filter((item) => item.name !== val));
      return current.filter((item) => item.name !== val);
      // return newValue ? [...current] : [...current, newValue],
    });

  const handleGenreRemove = (val: string) => {
    console.log("REMOVE", val);
    setGenre((current) => current.filter((v) => v.name !== val));
  };

  const valuesGenres = genre
    .slice(
      0,
      MAX_DISPLAYED_VALUES === genre.length
        ? MAX_DISPLAYED_VALUES
        : MAX_DISPLAYED_VALUES - 1,
    )
    .map((item) => (
      <Pill
        key={item.id}
        withRemoveButton
        onRemove={() => handleGenreRemove(item.name)}
      >
        {item.name}
      </Pill>
    ));

  const optionsGenres = genres
    .filter((item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase()),
    )
    .map((item) => (
      <Combobox.Option
        value={item.name}
        key={item.id}
        active={genre.includes(item)}
      >
        <Group gap="sm">
          {genre.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item.name}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox
      disabled={isError}
      store={combobox}
      onOptionSubmit={handleGenreSelect}
      withinPortal={false}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          label={LABEL_GENRES}
          {...props}
          rightSection={
            !isLoading ? (
              !combobox.dropdownOpened ? (
                <ArrowDownImage />
              ) : (
                <ArrowUpColoredImage />
              )
            ) : (
              <CustomLoader size={"xs"} />
            )
          }
          pointer
          disabled={isError}
          onClick={() => combobox.toggleDropdown()}
        >
          <Pill.Group>
            {valuesGenres.length > 0 ? (
              <>
                {valuesGenres}
                {genre.length > MAX_DISPLAYED_VALUES && (
                  <Pill>+{genre.length - (MAX_DISPLAYED_VALUES - 1)} more</Pill>
                )}
              </>
            ) : (
              <Input.Placeholder>
                {!isError ? PLACEHOLDER_GENRE_OK : PLACEHOLDER_GENRE_ERROR}
              </Input.Placeholder>
            )}

            <Combobox.EventsTarget>
              <PillsInput.Field
                // value={search}
                disabled={isError}
                type="hidden"
                onBlur={() => combobox.closeDropdown()}
                // onChange={(event) => {
                //   combobox.updateSelectedOptionIndex();
                //   setSearch(event.currentTarget.value);
                // }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace") {
                    event.preventDefault();
                    genre.length &&
                      handleGenreRemove(genre[genre.length - 1].name);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize
            classNames={{ thumb: "" }}
            mah={200}
            type="scroll"
          >
            {optionsGenres}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default CustomMultiSelect;
