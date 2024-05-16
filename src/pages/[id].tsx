import { MovieDetails } from "@/types/Movies";
import dynamic from "next/dynamic";
import { getMovie } from "@/services/apiService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NO_INFO_MOVIE_DETAILS } from "@/constants/constants";
import { notifications } from "@mantine/notifications";
import CustomLoader from "@/components/UI/Loader";
import { PATH } from "@/constants/enums";
import classes from "../styles/[id].module.css";

const MovieDetailsPage = dynamic(
  () => import("../components/MovieDetailsPage/index"),
);

export default function DetailsPage() {
  const router = useRouter();

  const [, setId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMovieError, setIsMovieError] = useState<boolean>(false);
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
    const id = Number(router.query.id) || Number(location.pathname.slice(1));
    if (isNaN(id) && id !== undefined) {
      setIsLoading(false);
      router.push(PATH.NOT_FOUND);
    }

    setId(id);

    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (id && router.isReady) {
          const data = await getMovie(id);
          if ("id" in data) {
            setMovie(data as MovieDetails);
          } else {
            router.push(PATH.NOT_FOUND);
          }
        }
      } catch (error) {
        notifications.show({
          title: (error as Error).name,
          message: (error as Error).message,
        });
        setIsMovieError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  return (
    <>
      <Head>
        <title>{movie ? `${movie.original_title}` : "Movie details"}</title>
        <meta
          name="description"
          content={movie ? `${movie.original_title}` : " "}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <div className={classes.content}>
        {isLoading ? (
          <CustomLoader />
        ) : isMovieError ? (
          <p>{NO_INFO_MOVIE_DETAILS}</p>
        ) : (
          movie && <MovieDetailsPage data={movie} />
        )}
      </div>
    </>
  );
}
