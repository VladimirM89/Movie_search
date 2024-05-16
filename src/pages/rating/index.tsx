import Head from "next/head";
import RatingPage from "@/components/RatingPage";

export default function UserRatedMovies() {
  return (
    <>
      <Head>
        <title>Rated Movie</title>
        <meta name="description" content="Page with rated movie" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <RatingPage />
    </>
  );
}
