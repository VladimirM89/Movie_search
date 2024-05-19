import classes from "./styles.module.css";
import { FC } from "react";

type NoSearchResultWithErrorProps = {
  text: string;
};

const NoSearchResultWithError: FC<NoSearchResultWithErrorProps> = ({
  text,
}) => {
  return <p className={classes.empty_results_text}>{text}</p>;
};

export default NoSearchResultWithError;
