import { MovieDetails } from "@/types/Movies";
import { FC } from "react";
import BreadcrumbsComponent from "../Breadcrumbs";
import MovieDetailsCard from "../MovieDetailsCard";
import MovieTrailerCard from "../MovieTrailerCard";

type MovieDetailsProps = {
  data: MovieDetails;
};

const Details: FC<MovieDetailsProps> = ({ data }) => {
  const { original_title, overview, production_companies, videos } = data;
  return (
    <div>
      <BreadcrumbsComponent title={original_title} />
      <MovieDetailsCard movieInfo={data} />
      <MovieTrailerCard
        overview={overview}
        videos={videos}
        production={production_companies}
      />
    </div>
  );
};

export default Details;
