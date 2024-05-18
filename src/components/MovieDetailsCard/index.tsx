import { Card } from "@mantine/core";
import Rating from "../UI/Rating";
import { MovieDetails } from "@/types/Movies";
import { FC, memo } from "react";
import { ALT_POSTER_IMG } from "@/constants/constants";
import Image from "next/image";
import MovieProfilePanel from "../MovieProfilePanel";
import MovieStatsPanel from "../MovieStatsPanel";
import { NoMoviePosterBigImage } from "../../../public/images";
import classes from "./styles.module.css";

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
    : NoMoviePosterBigImage;

  return (
    <Card radius={"md"} className={classes.details_container}>
      <div className={classes.details_content}>
        <Image
          className={classes.details_image}
          src={posterPath}
          width={250}
          height={352}
          priority={true}
          alt={ALT_POSTER_IMG}
        />
        <div className={classes.info_container}>
          <div className={classes.info_container_content}>
            <MovieProfilePanel
              isDetailsPage={true}
              title={original_title}
              release_date={release_date}
              vote_average={vote_average}
              vote_count={vote_count}
            />
            <div className={classes.rating_container}>
              <Rating movieInfo={movieInfo} />
            </div>
          </div>
          <MovieStatsPanel
            runtime={runtime}
            release_date={release_date}
            budget={budget}
            revenue={revenue}
            genres={genres}
          />
        </div>
      </div>
    </Card>
  );
});

export default MovieDetailsCard;
