import { FC } from "react";
import { MovieDetails } from "@/types/Movies";
import BreadcrumbsComponent from "../Breadcrumbs";
import MovieDetailsCard from "../MovieDetailsCard";
import MovieTrailerCard from "../MovieTrailerCard";
import classes from "./styles.module.css";

type MovieDetailsProps = {
  data: MovieDetails;
};

const Details: FC<MovieDetailsProps> = ({ data }) => {
  const { original_title, overview, production_companies, videos } = data;
  return (
    <div className={classes.content}>
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
