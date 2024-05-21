import { FC, memo } from "react";
import { Button, ButtonProps } from "@mantine/core";
import classes from "./styles.module.css";
import cn from "classnames";

interface StandardButtonProps extends ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  btnSize?: "fat" | "standard";
  onClick?: () => void;
}

const StandardButton: FC<StandardButtonProps> = memo(
  ({ text, type, onClick, btnSize = "standard", ...rest }) => {
    return (
      <Button
        className={cn(classes[btnSize], classes.button_root)}
        type={type ? type : "button"}
        variant="filled"
        radius="md"
        onClick={onClick}
        {...rest}
      >
        {text}
      </Button>
    );
  },
);

export default StandardButton;
