import { FC } from "react";
import { MovieDetails } from "@/types/Movies";
import CustomBreadcrumbs from "../CustomBreadcrumbs";
import MovieDetailsCard from "../MovieDetailsCard";
import MovieDescriptionCard from "../MovieDescriptionCard";
import classes from "./styles.module.css";

type MovieDetailsProps = {
  data: MovieDetails;
};

const Details: FC<MovieDetailsProps> = ({ data }) => {
  const { original_title, overview, production_companies, videos } = data;
  return (
    <div className={classes.content}>
      <CustomBreadcrumbs title={original_title} />
      <MovieDetailsCard movieInfo={data} />
      <MovieDescriptionCard
        overview={overview}
        videos={videos}
        production={production_companies}
      />
    </div>
  );
};

export default Details;
