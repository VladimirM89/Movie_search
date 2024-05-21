import { FC, useEffect, useState } from "react";
import { useMantineTheme, getThemeColor } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useRatedMoviesLocalStorage from "@/hooks/useRatedMoviesLocalStorage";
import {
  MANTINE_COLOR_PURPLE_4,
  MANTINE_COLOR_GRAY_SCALE_3,
} from "@/constants/colorConstants";
import {
  ALT_RATING_ICON,
  LOCAL_STORAGE_MOVIES_KEY,
} from "@/constants/constants";
import RatingModal from "@/components/RatingModal";
import { RatingImage } from "../../../../public/images";
import { Movie, RatedMovie } from "@/types/Movies";
import classes from "./styles.module.css";

type RatingProps = {
  movieInfo: Movie;
};

const Rating: FC<RatingProps> = ({ movieInfo }) => {
  const { handleChangeItem, removeItemById, getItemById } =
    useRatedMoviesLocalStorage(LOCAL_STORAGE_MOVIES_KEY);

  const initialRating = getItemById(movieInfo.id)?.userRating;
  const [rating, setRating] = useState<number>(initialRating || 0);

  useEffect(() => {
    const handleChangeRating = () => {
      if (rating) {
        const {
          id,
          original_title,
          genre_ids,
          release_date,
          vote_average,
          vote_count,
          poster_path,
        } = movieInfo;

        const newItem: RatedMovie = {
          id,
          original_title,
          genre_ids,
          poster_path,
          release_date,
          vote_count,
          vote_average,
          userRating: rating,
        };
        handleChangeItem(newItem);
      } else {
        removeItemById(movieInfo.id);
      }
    };

    handleChangeRating();
  }, [handleChangeItem, movieInfo, rating, removeItemById]);

  const [opened, { open, close }] = useDisclosure(false);

  const theme = useMantineTheme();
  const colorUserRated = getThemeColor(MANTINE_COLOR_PURPLE_4, theme);
  const colorNotRated = getThemeColor(MANTINE_COLOR_GRAY_SCALE_3, theme);

  const color = rating ? colorUserRated : colorNotRated;

  return (
    <>
      <div className={classes.container} onClick={open}>
        <RatingImage
          fill={color}
          stroke={color}
          width={28}
          height={28}
          alt={ALT_RATING_ICON}
        />
        {rating > 0 && <span className={classes.rating_text}>{rating}</span>}
      </div>
      <RatingModal
        title={movieInfo.original_title}
        rating={rating}
        setRating={setRating}
        close={close}
        opened={opened}
      />
    </>
  );
};

export default Rating;
