import { Card } from "@mantine/core";
import Rating from "../UI/Rating";
import { MovieDetails } from "@/types/Movies";
import { FC, memo } from "react";
import { ALT_POSTER_IMG, PATH_TO_NO_MOVIE_POSTER } from "@/constants/constants";
import Image from "next/image";

type MovieDetailsCardType = {
  movieInfo: MovieDetails;
};

const MovieDetailsCard: FC<MovieDetailsCardType> = memo(({ movieInfo }) => {
  const posterPath = movieInfo.poster_path
    ? `${process.env.NEXT_PUBLIC_IMG_BASE_URL}${movieInfo.poster_path}`
    : PATH_TO_NO_MOVIE_POSTER;
  const {
    original_title,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    runtime,
    budget,
    revenue,
    genre_ids,
  } = movieInfo;
  return (
    <Card radius={"md"}>
      <div>
        <Image
          src={posterPath}
          width={250}
          height={352}
          priority={true}
          alt={ALT_POSTER_IMG}
        />
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
      <Rating movieInfo={movieInfo} />
    </Card>
  );
});

export default MovieDetailsCard;
