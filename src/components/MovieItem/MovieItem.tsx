import { FC, memo } from "react";
import Image from "next/image";
import Rating from "../UI/Rating";
import { Card } from "@mantine/core";
import classes from "./MovieItem.module.css";
import {
  ALT_POSTER_IMG,
  NO_GENRES_INFO,
  PATH_TO_NO_MOVIE_POSTER,
} from "@/constants/constants";
import { Movie } from "@/types/Movies";
import { useRouter } from "next/router";
import parseGenreIds from "../../utils/parseGenreIds";
import MovieProfilePanel from "../MovieProfilePanel";

type MovieItemProps = {
  movieInfo: Movie;
};

const MovieItem: FC<MovieItemProps> = memo(({ movieInfo }) => {
  const posterPath = movieInfo.poster_path
    ? `${process.env.NEXT_PUBLIC_IMG_BASE_URL}${movieInfo.poster_path}`
    : PATH_TO_NO_MOVIE_POSTER;

  const router = useRouter();

  const navigateToDetailPage = () => {
    router.push(`${movieInfo.id}`);
  };

  return (
    <Card radius={"md"} classNames={{ root: classes.content }}>
      <div
        className={classes.description_container}
        onClick={navigateToDetailPage}
      >
        <Image
          src={posterPath}
          width={119}
          height={170}
          priority={true}
          alt={ALT_POSTER_IMG}
        />
        <div>
          <MovieProfilePanel
            title={movieInfo.original_title}
            release_date={movieInfo.release_date}
            vote_average={movieInfo.vote_average}
            vote_count={movieInfo.vote_count}
          />
          <div>
            {movieInfo.genre_ids && movieInfo.genre_ids.length ? (
              <>
                <span>Genres </span>
                <span>
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
