import { FC, ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import { ALT_DEFAULT_NOT_FOUND_IMG } from "@/constants/constants";
import classes from "./styles.module.css";

type NotFoundProps = {
  img: StaticImageData;
  text?: string;
  alt?: string;
  width: number | `${number}` | undefined;
  height: number | `${number}` | undefined;
  children?: ReactNode;
};

const NotFound: FC<NotFoundProps> = ({
  img,
  text,
  alt,
  children,
  width,
  height,
}) => {
  return (
    <div className={classes.content}>
      <Image
        src={img}
        alt={alt || ALT_DEFAULT_NOT_FOUND_IMG}
        width={width}
        height={height}
      />
      <p className={classes.description_text}>{text}</p>
      {children}
    </div>
  );
};

export default NotFound;
