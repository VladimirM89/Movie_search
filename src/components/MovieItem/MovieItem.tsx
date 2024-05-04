import { Movie } from "@/models/Response";
import { FC, memo, useEffect, useState } from "react";
import Image from "next/image";
import RatingIcon from "../UI/RatingIcon/RatingIcon";
import { useMantineTheme, getThemeColor, Card } from "@mantine/core";
import RatingModal from "../RatingModal/RatingModal";
import { useDisclosure } from "@mantine/hooks";
import classes from "./MovieItem.module.css";
import {
  ALT_POSTER_IMG,
  LOCAL_STORAGE_MOVIES_KEY,
  PATH_TO_NO_MOVIE_POSTER,
} from "@/constants/constants";
import useRatedMoviesLocalStorage from "@/hooks/useRatedMoviesLocalStorage";
import { RatedMovie } from "@/models/RatedMovie";
import { useRouter } from "next/router";
import parseGenreIds from "../utils/parseGenreIds";
import {
  MANTINE_COLOR_PURPLE_4,
  MANTINE_COLOR_YELLOW_6,
} from "@/constants/colorConstants";
import convertToShortFormat from "../utils/convertToShortFormat";

type MovieItemProps = {
  movieInfo: Movie;
};

const MovieItem: FC<MovieItemProps> = memo(({ movieInfo }) => {
  const posterPath = movieInfo.poster_path
    ? `${process.env.NEXT_PUBLIC_IMG_BASE_URL}${movieInfo.poster_path}`
    : PATH_TO_NO_MOVIE_POSTER;

  const releaseDate = new Date(movieInfo.release_date);

  const theme = useMantineTheme();
  const colorYellow = getThemeColor(MANTINE_COLOR_YELLOW_6, theme);
  const colorPurple = getThemeColor(MANTINE_COLOR_PURPLE_4, theme);

  const [opened, { open, close }] = useDisclosure(false);
  const { setItem, removeItemById, getItemById } = useRatedMoviesLocalStorage(
    LOCAL_STORAGE_MOVIES_KEY,
  );

  const initialRating = getItemById(movieInfo.id)?.userRating;
  const [rating, setRating] = useState<number>(initialRating || 0);

  const router = useRouter();

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
        } = movieInfo;

        const newItem: RatedMovie = {
          id,
          original_title,
          genre_ids,
          poster_path: posterPath,
          release_date,
          vote_count,
          vote_average,
          userRating: rating,
        };
        setItem(newItem);
      } else {
        removeItemById(movieInfo.id);
      }
    };

    handleChangeRating();
  }, [movieInfo, posterPath, rating, removeItemById, setItem]);

  const navigateToDetailPage = () => {
    router.push(`${movieInfo.id}`);
  };

  return (
    <Card radius={"md"} classNames={{ root: classes.content }}>
      <div
        className={classes.description_container}
        onClick={navigateToDetailPage}
      >
        <Image src={posterPath} width={119} height={170} alt={ALT_POSTER_IMG} />
        <div>
          <p>{movieInfo.original_title}</p>
          <p>{releaseDate.getFullYear()}</p>
          <div>
            <RatingIcon color={colorYellow} />
            <span>{movieInfo.vote_average}</span>
            <span>({convertToShortFormat(movieInfo.vote_count)})</span>
          </div>
          <p>
            <span>Genres</span>
            <span>{parseGenreIds(movieInfo.genre_ids)}</span>
          </p>
        </div>
      </div>
      <div>
        <RatingIcon handleClick={open} color={rating > 0 ? colorPurple : ""} />
        {rating > 0 && <span>{rating}</span>}
      </div>
      <RatingModal
        title={movieInfo.original_title}
        rating={rating}
        setRating={setRating}
        close={close}
        opened={opened}
      />
    </Card>
  );
});

export default MovieItem;
