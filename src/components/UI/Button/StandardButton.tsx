import { Button, MantineSize } from "@mantine/core";
import { FC } from "react";

type StandardButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  size:
    | (string & object)
    | MantineSize
    | "compact-xs"
    | "compact-sm"
    | "compact-md"
    | "compact-lg"
    | "compact-xl";
  onClick: () => void;
};

const StandardButton: FC<StandardButtonProps> = ({
  text,
  type,
  size,
  onClick,
  ...rest
}) => {
  return (
    <Button
      size={size}
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
