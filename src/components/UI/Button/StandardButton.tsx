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
};

const StandardButton: FC<StandardButtonProps> = ({ text, type, size }) => {
  return (
    <Button
      size={size}
      type={type ? type : "button"}
      variant="filled"
      radius="md"
    >
      {text}
    </Button>
  );
};

export default StandardButton;
