import { FC } from "react";
import { Genre } from "@/types/Response";
import classes from "./index.module.css";
import formatTime from "../../utils/formatTime";
import formatDate from "../../utils/formatDate";
import formatMoney from "../../utils/formatMoney";
import {
  BUDGET_SUBTITLE,
  DURATION_SUBTITLE,
  GENRES_SUBTITLE,
  PREMIERE_SUBTITLE,
  REVENUE_SUBTITLE,
} from "@/constants/constants";

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
  return (
    <div className={classes.stats_container}>
      <div>
        <p>{DURATION_SUBTITLE}</p>
        <p>{PREMIERE_SUBTITLE}</p>
        <p>{BUDGET_SUBTITLE}</p>
        <p>{REVENUE_SUBTITLE}</p>
        <p>{GENRES_SUBTITLE}</p>
      </div>
      <div>
        <p>{formatTime(runtime)}</p>
        <p>{formatDate(release_date)}</p>
        <p>{formatMoney(budget)}</p>
        <p>{formatMoney(revenue)}</p>
        <p>{genres.map((item) => item.name).join(", ")}</p>
      </div>
    </div>
  );
};

export default MovieStatsPanel;
