import { MovieDetails } from "@/types/Movies";
import dynamic from "next/dynamic";
import { getMovie } from "@/services/apiService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import showError from "@/utils/showError";
import { NO_INFO_MOVIE_DETAILS } from "@/constants/constants";
import CustomLoader from "@/components/UI/Loader";
import { HTTP_STATUS_CODE, PATH } from "@/constants/enums";
import NoSearchResultWithError from "@/components/UI/NoSearchResultWithError";
import classes from "../styles/[id].module.css";

const MovieDetailsPage = dynamic(
  () => import("../components/MovieDetailsPage/index"),
);

export default function DetailsPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMovieError, setIsMovieError] = useState<boolean>(false);
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
    const id = Number(router.query.id) || Number(location.pathname.slice(1));
    if (isNaN(id) && id !== undefined) {
      setIsLoading(false);
      router.push(PATH.NOT_FOUND);
    }

    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (id && router.isReady) {
          const response = await getMovie(id);

          if (response.status === HTTP_STATUS_CODE.NOT_FOUND) {
            setIsLoading(false);
            showError(response.status, response.statusText);
            router.push(PATH.NOT_FOUND);
            return;
          }

          const data = (await response.json()) as MovieDetails;
          if (data && "id" in data) {
            setMovie(data);
          } else {
            showError(response.status, response.statusText);
            setIsMovieError(true);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          showError(error.name, error.message);
        }
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
          <NoSearchResultWithError text={NO_INFO_MOVIE_DETAILS} />
        ) : (
          movie && <MovieDetailsPage data={movie} />
        )}
      </div>
    </>
  );
}
