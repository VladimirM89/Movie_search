import { FC, HTMLAttributes, ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import { ALT_DEFAULT_NOT_FOUND_IMG } from "@/constants/constants";
import classes from "./styles.module.css";

interface NotFoundProps extends HTMLAttributes<HTMLDivElement> {
  img: StaticImageData;
  text?: string;
  alt?: string;
  width: number | `${number}` | undefined;
  height: number | `${number}` | undefined;
  children?: ReactNode;
}

const NotFound: FC<NotFoundProps> = ({
  img,
  text,
  alt,
  children,
  width,
  height,
  ...rest
}) => {
  return (
    <div className={classes.content} {...rest}>
      <Image
        className={classes.not_found_image}
        src={img}
        alt={alt || ALT_DEFAULT_NOT_FOUND_IMG}
        width={width}
        height={height}
        priority={true}
      />
      <div className={classes.content}>
        <p className={classes.description_text}>{text}</p>
        {children}
      </div>
    </div>
  );
};

export default NotFound;
