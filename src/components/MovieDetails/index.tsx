import { MovieDetails } from "@/types/Movies";
import { FC } from "react";
import BreadcrumbsComponent from "../Breadcrumbs";

type MovieDetailsProps = {
  data: MovieDetails;
};

const Details: FC<MovieDetailsProps> = ({ data }) => {
  return (
    <div>
      <BreadcrumbsComponent title={data.original_title} />
      <p>{data.original_title}</p>
    </div>
  );
};

export default Details;
