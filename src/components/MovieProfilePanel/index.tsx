import { FC } from "react";
import { useMantineTheme, getThemeColor } from "@mantine/core";
import validateDate from "../../utils/validateDate";
import convertToShortFormat from "../../utils/convertToShortFormat";
import { MANTINE_COLOR_YELLOW_6 } from "@/constants/colorConstants";
import { ALT_RATING_ICON } from "@/constants/constants";
import { RatingImage } from "../../../public/images";
import classes from "./styles.module.css";

type MovieProfilePanelType = {
  title: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
};

const MovieProfilePanel: FC<MovieProfilePanelType> = ({
  title,
  release_date,
  vote_average,
  vote_count,
}) => {
  const theme = useMantineTheme();
  const colorRatedFromApi = getThemeColor(MANTINE_COLOR_YELLOW_6, theme);

  return (
    <div className={classes.profile_container}>
      <p className={classes.profile_title}>{title}</p>
      <p className={classes.profile_year}>{validateDate(release_date)}</p>
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
