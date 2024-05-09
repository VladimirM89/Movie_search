import { MovieDetails } from "@/types/Movies";
import dynamic from "next/dynamic";
import { getMovie } from "@/components/utils/api";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";

const MovieDetailsPage = dynamic(
  () => import("../components/MovieDetailsPage/index"),
);

export default function DetailsPage() {
  const router = useRouter();

  const [, setId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
    const id = Number(router.query.id) || Number(location.pathname.slice(1));

    // console.log(id);

    if (isNaN(id)) router.push("404");

    setId(id);

    const fetchData = async () => {
      setIsLoading(true);
      if (id && router.isReady) {
        const data = await getMovie(id);
        // console.log(data, "id" in data);

        if ("id" in data) {
          setMovie(data as MovieDetails);
          setIsLoading(false);
        } else {
          router.push("404");
        }
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
      <div>
        {isLoading ? <Loader /> : movie && <MovieDetailsPage data={movie} />}
      </div>
    </>
  );
}
