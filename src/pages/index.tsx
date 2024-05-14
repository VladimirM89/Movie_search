import Head from "next/head";
import SearchPage from "@/components/SearchPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Movie Search App</title>
        <meta name="description" content="Movie Search App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <SearchPage />
    </>
  );
}
