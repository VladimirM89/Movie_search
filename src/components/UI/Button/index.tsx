import { FC } from "react";
import { Button, ButtonProps } from "@mantine/core";
import classes from "./styles.module.css";

interface StandardButtonProps extends ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  btnSize?: "fat" | "standard";
  onClick?: () => void;
}

const StandardButton: FC<StandardButtonProps> = ({
  text,
  type,
  onClick,
  btnSize = "standard",
  ...rest
}) => {
  return (
    <Button
      className={classes[btnSize]}
      classNames={{
        root: classes.button_root,
      }}
      type={type ? type : "button"}
      variant="filled"
      radius="md"
      onClick={onClick}
      {...rest}
    >
      {text}
    </Button>
  );
};

export default StandardButton;
