import { MANTINE_COLOR_YELLOW_6 } from "@/constants/colorConstants";
import { ALT_RATING_ICON } from "@/constants/constants";
import { useMantineTheme, getThemeColor } from "@mantine/core";
import { RatingImage } from "../../../public/images";
import convertToShortFormat from "../../utils/convertToShortFormat";
import validateDate from "../../utils/validateDate";
import { FC } from "react";

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
    <div>
      <p>{title}</p>
      <p>{validateDate(release_date)}</p>
      <div>
        <RatingImage
          fill={colorRatedFromApi}
          stroke={colorRatedFromApi}
          width={28}
          height={28}
          alt={ALT_RATING_ICON}
        />
        <span>{vote_average}</span>
        <span>({convertToShortFormat(vote_count)})</span>
      </div>
    </div>
  );
};

export default MovieProfilePanel;
