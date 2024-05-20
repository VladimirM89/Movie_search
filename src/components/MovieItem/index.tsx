import { FC, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Card } from "@mantine/core";
import cn from "classnames";
import parseGenreIds from "../../utils/parseGenreIds";
import {
  ALT_POSTER_IMG,
  GENRES_SUBTITLE,
  NO_GENRES_INFO,
} from "@/constants/constants";
import { Movie } from "@/types/Movies";
import Rating from "../UI/Rating";
import MovieProfilePanel from "../MovieProfilePanel";
import { NoMoviePosterSmallImage } from "../../../public/images";
import classes from "./styles.module.css";

type MovieItemProps = {
  movieInfo: Movie;
};

const MovieItem: FC<MovieItemProps> = ({ movieInfo }) => {
  const posterPath = movieInfo.poster_path
    ? `${process.env.NEXT_PUBLIC_IMG_BASE_URL}${movieInfo.poster_path}`
    : NoMoviePosterSmallImage;

  const router = useRouter();

  const navigateToDetailPage = useCallback(() => {
    router.push(`${movieInfo.id}`);
  }, [movieInfo.id, router]);

  return (
    <Card classNames={{ root: classes.container }}>
      <div className={classes.content}>
        <Image
          onClick={navigateToDetailPage}
          className={classes.poster_image}
          src={posterPath}
          width={119}
          height={170}
          priority={true}
          alt={ALT_POSTER_IMG}
        />
        <div className={classes.description_container}>
          <div className={classes.info_container}>
            <MovieProfilePanel
              onClick={navigateToDetailPage}
              title={movieInfo.original_title}
              release_date={movieInfo.release_date}
              vote_average={movieInfo.vote_average}
              vote_count={movieInfo.vote_count}
            />
            <Rating movieInfo={movieInfo} />
          </div>
          <div className={classes.genres_container}>
            {movieInfo.genre_ids && movieInfo.genre_ids.length ? (
              <>
                <span className={classes.genres_title}>{GENRES_SUBTITLE}</span>
                <span
                  className={cn(classes.genres_list, "long_text_container")}
                >
                  {movieInfo.genre_ids &&
                    movieInfo.genre_ids.length &&
                    parseGenreIds(movieInfo.genre_ids)}
                </span>
              </>
            ) : (
              <span className={classes.genres}>{NO_GENRES_INFO}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MovieItem;
