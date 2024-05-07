import { MovieDetails } from "@/types/Movies";
import { GetServerSideProps } from "next";
import { API_ENDPOINTS, STATUS_CODE } from "@/constants/enums";
import checkIsNumber from "@/components/utils/checkIsNumber";
import dynamic from "next/dynamic";

const Details = dynamic(() => import("../components/MovieDetailsPage/index"));

type DetailsPageProps = {
  data: MovieDetails;
};

export default function DetailsPage({ data }: DetailsPageProps) {
  return <Details data={data} />;
}

export const getServerSideProps = (async (context) => {
  const { query } = context;
  const { id } = query;

  if (id && !Array.isArray(id)) {
    if (!checkIsNumber(id)) {
      return { notFound: true };
    }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.MOVIE}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&&append_to_response=videos`,
  );
  const data = await res.json();

  if (res.status !== STATUS_CODE.OK) {
    return { notFound: true };
  }
  return { props: { data } };
}) satisfies GetServerSideProps<{ data: MovieDetails }>;
