import classes from "./styles.module.css";
import { FC } from "react";

type NoSearchResultProps = {
  text: string;
};

const NoSearchResult: FC<NoSearchResultProps> = ({ text }) => {
  return <p className={classes.empty_results_text}>{text}</p>;
};

export default NoSearchResult;
