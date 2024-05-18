import { FC } from "react";
import {
  BUDGET_SUBTITLE,
  DURATION_SUBTITLE,
  GENRES_SUBTITLE,
  MAX_DISPLAYED_GENRES,
  PREMIERE_SUBTITLE,
  REVENUE_SUBTITLE,
} from "@/constants/constants";
import { Genre } from "@/types/Response";
import formatTime from "../../utils/formatTime";
import formatDate from "../../utils/formatDate";
import formatMoney from "../../utils/formatMoney";
import classes from "./styles.module.css";

type MovieStatsPanelProps = {
  runtime: number;
  release_date: string;
  budget: number;
  revenue: number;
  genres: Array<Genre>;
};

const MovieStatsPanel: FC<MovieStatsPanelProps> = ({
  runtime,
  release_date,
  budget,
  revenue,
  genres,
}) => {
  const displayedGenres = genres
    .slice(0, MAX_DISPLAYED_GENRES)
    .map((item) => item.name)
    .join(", ");
  return (
    <div className={classes.stats_container}>
      <div className={[classes.info_title, classes.content_list].join(" ")}>
        <p>{DURATION_SUBTITLE}</p>
        <p>{PREMIERE_SUBTITLE}</p>
        <p>{BUDGET_SUBTITLE}</p>
        <p>{REVENUE_SUBTITLE}</p>
        <p>{GENRES_SUBTITLE}</p>
      </div>
      <div className={classes.content_list}>
        <p>{formatTime(runtime)}</p>
        <p>{formatDate(release_date)}</p>
        <p>{formatMoney(budget)}</p>
        <p>{formatMoney(revenue)}</p>
        <p>{displayedGenres}</p>
      </div>
    </div>
  );
};

export default MovieStatsPanel;
