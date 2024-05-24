import { FC } from "react";
import { Loader, LoaderProps } from "@mantine/core";
import classes from "./styles.module.css";

interface CustomLoaderProps extends LoaderProps {}

const CustomLoader: FC<CustomLoaderProps> = ({ ...props }) => {
  return (
    <div className={classes.loader_container}>
      <Loader {...props} />
    </div>
  );
};

export default CustomLoader;
