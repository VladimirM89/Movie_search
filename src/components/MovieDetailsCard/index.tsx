import { Card } from "@mantine/core";
import Rating from "../UI/Rating";
import { MovieDetails } from "@/types/Movies";
import { FC, memo } from "react";
import { ALT_POSTER_IMG, PATH_TO_NO_MOVIE_POSTER } from "@/constants/constants";
import Image from "next/image";
import MovieProfilePanel from "../MovieProfilePanel";
import MovieStatsPanel from "../MovieStatsPanel";
import classes from "./index.module.css";

type MovieDetailsCardProps = {
  movieInfo: MovieDetails;
};

const MovieDetailsCard: FC<MovieDetailsCardProps> = memo(({ movieInfo }) => {
  const {
    original_title,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    runtime,
    budget,
    revenue,
    genres,
  } = movieInfo;

  const posterPath = poster_path
    ? `${process.env.NEXT_PUBLIC_IMG_BASE_URL}${poster_path}`
    : PATH_TO_NO_MOVIE_POSTER;

  return (
    <Card radius={"md"} className={classes.details_container}>
      <div className={classes.details_content}>
        <Image
          src={posterPath}
          width={250}
          height={352}
          priority={true}
          alt={ALT_POSTER_IMG}
        />
        <div>
          <MovieProfilePanel
            title={original_title}
            release_date={release_date}
            vote_average={vote_average}
            vote_count={vote_count}
          />
          <MovieStatsPanel
            runtime={runtime}
            release_date={release_date}
            budget={budget}
            revenue={revenue}
            genres={genres}
          />
        </div>
      </div>
      <Rating movieInfo={movieInfo} />
    </Card>
  );
});

export default MovieDetailsCard;
