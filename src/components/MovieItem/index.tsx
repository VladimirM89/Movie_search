import { FC, memo, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Card } from "@mantine/core";
import parseGenreIds from "../../utils/parseGenreIds";
import {
  ALT_POSTER_IMG,
  NO_GENRES_INFO,
  PATH_TO_NO_MOVIE_POSTER,
} from "@/constants/constants";
import { Movie } from "@/types/Movies";
import Rating from "../UI/Rating";
import MovieProfilePanel from "../MovieProfilePanel";
import classes from "./styles.module.css";

type MovieItemProps = {
  movieInfo: Movie;
};

const MovieItem: FC<MovieItemProps> = memo(({ movieInfo }) => {
  const posterPath = movieInfo.poster_path
    ? `${process.env.NEXT_PUBLIC_IMG_BASE_URL}${movieInfo.poster_path}`
    : PATH_TO_NO_MOVIE_POSTER;

  const router = useRouter();

  const navigateToDetailPage = useCallback(() => {
    router.push(`${movieInfo.id}`);
  }, [movieInfo.id, router]);

  return (
    <Card radius={"md"} classNames={{ root: classes.content }}>
      <div
        className={classes.description_container}
        onClick={navigateToDetailPage}
      >
        <Image
          className={classes.poster_image}
          src={posterPath}
          width={119}
          height={170}
          priority={true}
          alt={ALT_POSTER_IMG}
        />
        <div className={classes.info_container}>
          <MovieProfilePanel
            title={movieInfo.original_title}
            release_date={movieInfo.release_date}
            vote_average={movieInfo.vote_average}
            vote_count={movieInfo.vote_count}
          />
          <div className={classes.genres_container}>
            {movieInfo.genre_ids && movieInfo.genre_ids.length ? (
              <>
                <span className={classes.genres_title}>Genres </span>
                <span className={classes.genres}>
                  {movieInfo.genre_ids &&
                    movieInfo.genre_ids.length &&
                    parseGenreIds(movieInfo.genre_ids)}
                </span>
              </>
            ) : (
              NO_GENRES_INFO
            )}
          </div>
        </div>
      </div>
      <div>
        <Rating movieInfo={movieInfo} />
      </div>
    </Card>
  );
});

export default MovieItem;
