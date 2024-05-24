import { FC } from "react";
import {
  BUDGET_SUBTITLE,
  DURATION_SUBTITLE,
  GENRES_SUBTITLE,
  NO_GENRES_INFO,
  NO_INFO_TEXT,
  NO_RELEASE_DATE,
  PREMIERE_SUBTITLE,
  REVENUE_SUBTITLE,
} from "@/constants/constants";
import { Genre } from "@/types/Response";
import formatTime from "../../utils/formatTime";
import formatDate from "../../utils/formatDate";
import formatMoney from "../../utils/formatMoney";
import classes from "./styles.module.css";
import validateDate from "@/utils/validateDate";

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
  const displayedGenres = genres.map((item) => item.name).join(", ");
  return (
    <div>
      <div className={classes.stats_container}>
        <div className={classes.content_list}>
          <p className={classes.info_title}>{DURATION_SUBTITLE}</p>
          <p className="long_text_container">
            {runtime ? formatTime(runtime) : NO_INFO_TEXT}
          </p>
        </div>
        <div className={classes.content_list}>
          <p className={classes.info_title}>{PREMIERE_SUBTITLE}</p>
          <p className="long_text_container">
            {validateDate(release_date)
              ? formatDate(release_date)
              : NO_RELEASE_DATE}
          </p>
        </div>
        <div className={classes.content_list}>
          <p className={classes.info_title}>{BUDGET_SUBTITLE}</p>
          <p className={classes.info_meaning}>{formatMoney(budget)}</p>
        </div>
        <div className={classes.content_list}>
          <p className={classes.info_title}>{REVENUE_SUBTITLE}</p>
          <p className={classes.info_meaning}>{formatMoney(revenue)}</p>
        </div>
        <div className={classes.content_list}>
          <p className={classes.info_title}>{GENRES_SUBTITLE}</p>
          <p className="long_text_container">
            {genres.length ? displayedGenres : NO_GENRES_INFO}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieStatsPanel;
