import { useRouter } from "next/router";

export default function MovieDetails() {
  const router = useRouter();
  return <p>Movie id: {router.query.id}</p>;
}
