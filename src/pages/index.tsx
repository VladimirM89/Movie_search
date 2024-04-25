import Head from "next/head";
import SearchPanel from "@/components/SearchPanel/SearchPanel";
import MovieList from "@/components/MovieList/MovieList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Movie Search App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <SearchPanel />
        <MovieList />
      </div>
    </>
  );
}
