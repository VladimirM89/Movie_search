import { FC } from "react";
import Image from "next/image";
import { Card, Divider } from "@mantine/core";
import cn from "classnames";
import { MovieTrailer, ProductionCompanies } from "@/types/Response";
import {
  ALT_PRODUCTION_COMPANY_DEFAULT_LOGO_ICON,
  DESCRIPTION_TEXT,
  PATH_TO_PRODUCTION_COMPANY_DEFAULT_LOGO,
  PRODUCTION_TEXT,
  TRAILER_TEXT,
} from "@/constants/constants";
import classes from "./styles.module.css";

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

  const productionsInfo = () => {
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
            <p className={classes.production_title}>{item.name}</p>
          </li>
        ))}
      </ul>
    );
  };

  return overview || officialTrailer || officialTrailer ? (
    <Card radius={"md"} className={classes.card_content}>
      {officialTrailer && (
        <>
          <div className={classes.trailer_container}>
            <p className={classes.title}>{TRAILER_TEXT}</p>
            <iframe
              className={classes.trailer_frame}
              allowFullScreen
              width={498}
              height={281}
              src={`${process.env.NEXT_PUBLIC_BASE_TRAILER_PATH}${officialTrailer?.key}`}
            ></iframe>
          </div>
          <Divider />
        </>
      )}
      <div
        className={
          officialTrailer
            ? classes.info_container
            : production.length
              ? cn(classes.info_container, classes.without_top_padding)
              : cn(
                  classes.info_container,
                  classes.without_top_padding,
                  classes.without_bottom_padding,
                )
        }
      >
        <p className={classes.title}>{DESCRIPTION_TEXT}</p>
        <p className={classes.overview}>{overview}</p>
      </div>
      {production.length > 0 && (
        <>
          <Divider />
          <div
            className={cn(
              classes.info_container,
              classes.without_bottom_padding,
            )}
          >
            <p className={classes.title}>{PRODUCTION_TEXT}</p>
            <>{productionsInfo()}</>
          </div>
        </>
      )}
    </Card>
  ) : (
    <></>
  );
};

export default MovieTrailerCard;
