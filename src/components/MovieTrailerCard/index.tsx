import {
  ALT_PRODUCTION_COMPANY_DEFAULT_LOGO_ICON,
  DESCRIPTION_TEXT,
  OFFICIAL_TRAILER_NOT_FOUND,
  PATH_TO_PRODUCTION_COMPANY_DEFAULT_LOGO,
  PRODUCTION_TEXT,
  TRAILER_NOT_FOUND,
  TRAILER_TEXT,
} from "@/constants/constants";
import { MovieTrailer, ProductionCompanies } from "@/types/Response";
import { Card } from "@mantine/core";
import Image from "next/image";
import { FC, useCallback } from "react";
import classes from "./index.module.css";

type MovieTrailerCardProps = {
  overview: string;
  production: Array<ProductionCompanies>;
  videos: MovieTrailer | undefined;
};

const MovieTrailerCard: FC<MovieTrailerCardProps> = ({
  overview,
  production,
  videos,
}) => {
  const officialTrailer = videos?.results.find((item) => item.official);

  const productionsInfo = useCallback(() => {
    return (
      <ul className={classes.production_list}>
        {production.map((item) => (
          <li key={item.id} className={classes.production_item}>
            <Image
              className={classes.production_logo}
              src={`${item.logo_path ? `${process.env.NEXT_PUBLIC_IMG_BASE_URL}${item.logo_path}` : PATH_TO_PRODUCTION_COMPANY_DEFAULT_LOGO}`}
              width={40}
              height={40}
              alt={ALT_PRODUCTION_COMPANY_DEFAULT_LOGO_ICON}
            />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    );
  }, [production]);

  return (
    <Card radius={"md"}>
      <div>
        <p>{TRAILER_TEXT}</p>
        {!(videos && videos.results.length) && <p>{TRAILER_NOT_FOUND}</p>}
        {officialTrailer ? (
          <iframe
            className={classes.trailer_frame}
            allowFullScreen
            width={500}
            height={281}
            src={`${process.env.NEXT_PUBLIC_BASE_TRAILER_PATH}${officialTrailer.key}`}
          ></iframe>
        ) : (
          <p>{OFFICIAL_TRAILER_NOT_FOUND}</p>
        )}
      </div>
      <div>
        <p>{DESCRIPTION_TEXT}</p>
        <p>{overview}</p>
      </div>
      <div>
        <p>{PRODUCTION_TEXT}</p>
        <>{productionsInfo()}</>
      </div>
    </Card>
  );
};

export default MovieTrailerCard;
