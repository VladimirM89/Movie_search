import { FC } from "react";
import { useMantineTheme, getThemeColor } from "@mantine/core";
import cn from "classnames";
import getFullDate from "../../utils/getFullYear";
import convertToShortFormat from "../../utils/convertToShortFormat";
import { MANTINE_COLOR_YELLOW_6 } from "@/constants/colorConstants";
import { ALT_RATING_ICON, NO_RELEASE_YEAR } from "@/constants/constants";
import { RatingImage } from "../../../public/images";
import classes from "./styles.module.css";
import validateDate from "@/utils/validateDate";

type MovieProfilePanelType = {
  title: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  isDetailsPage?: boolean;
  onClick?: () => void;
};

const MovieProfilePanel: FC<MovieProfilePanelType> = ({
  title,
  release_date,
  vote_average,
  vote_count,
  isDetailsPage,
  onClick,
}) => {
  const theme = useMantineTheme();
  const colorRatedFromApi = getThemeColor(MANTINE_COLOR_YELLOW_6, theme);

  return (
    <div
      onClick={onClick}
      className={
        !isDetailsPage
          ? classes.profile_container
          : classes.profile_container_details
      }
    >
      <p className={cn(classes.profile_title, "long_text_container")}>
        {title}
      </p>
      <p className={classes.profile_year}>
        {validateDate(release_date)
          ? getFullDate(release_date)
          : NO_RELEASE_YEAR}
      </p>
      <div className={classes.rating_container}>
        <div className={classes.rating_info}>
          <RatingImage
            fill={colorRatedFromApi}
            stroke={colorRatedFromApi}
            width={28}
            height={28}
            alt={ALT_RATING_ICON}
          />
          <p className={classes.profile_rating}>{vote_average}</p>
        </div>
        <p className={classes.profile_voting}>
          ({convertToShortFormat(vote_count)})
        </p>
      </div>
    </div>
  );
};

export default MovieProfilePanel;
