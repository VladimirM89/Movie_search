import { Movie } from "@/models/Response";
import { FC, useState } from "react";
import Image from "next/image";
import RatingIcon from "../UI/RatingIcon/RatingIcon";
import { useMantineTheme, getThemeColor, Modal, Rating } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import StandardButton from "../UI/Button/StandardButton";

type MovieItemProps = {
  movieInfo: Movie;
};

const MovieItem: FC<MovieItemProps> = ({ movieInfo }) => {
  const posterPath = movieInfo.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${movieInfo.backdrop_path}`
    : "/noMoviePoster.png";

  const theme = useMantineTheme();
  const colorYellow = getThemeColor("yellow.6", theme);
  const colorPurple = getThemeColor("purple.4", theme);

  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  const handleRating = () => {
    setRating(value);
    if (value > 0) {
      console.log("Save movie lo LS. Rating: ", value);
    } else {
      console.log("Delete move from LS. Rating: ", value);
    }
    close();
  };

  const handleCloseModal = () => {
    close();
    setValue(rating);
  };

  return (
    <div>
      <Image
        src={posterPath}
        width={119}
        height={170}
        alt="Picture of the movie"
      />
      <div>
        <p>{movieInfo.original_title}</p>
        <p>{movieInfo.release_date}</p>
        <div>
          <RatingIcon color={colorYellow} />
          <p>{movieInfo.vote_average}</p>
        </div>
        <p>{movieInfo.vote_count}</p>
        <p>{movieInfo.genre_ids}</p>
      </div>
      <div>
        <RatingIcon handleClick={open} color={rating > 0 ? colorPurple : ""} />
        {rating > 0 && <span>{rating}</span>}
      </div>
      <Modal
        closeButtonProps={{ size: "sm" }}
        opened={opened}
        onClose={handleCloseModal}
        title="Your rating"
        radius={"md"}
        size={"sm"}
      >
        <p>{movieInfo.original_title}</p>
        <Rating
          value={value}
          onChange={setValue}
          count={10}
          color={colorYellow}
          size="lg"
        />
        <StandardButton
          text="Save"
          size="md"
          onClick={handleRating}
        ></StandardButton>
      </Modal>
    </div>
  );
};

export default MovieItem;
