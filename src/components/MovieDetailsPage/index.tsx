import { MovieDetails } from "@/types/Movies";
import { FC } from "react";
import BreadcrumbsComponent from "../Breadcrumbs";
import MovieDetailsCard from "../MovieDetailsCard";

type MovieDetailsProps = {
  data: MovieDetails;
};

const Details: FC<MovieDetailsProps> = ({ data }) => {
  return (
    <div>
      <BreadcrumbsComponent title={data.original_title} />
      <MovieDetailsCard movieInfo={data} />
    </div>
  );
};

export default Details;
