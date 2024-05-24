import { NumberInput, NumberInputProps } from "@mantine/core";
import { FC } from "react";
import classes from "./styles.module.css";

interface CustomNumberInputProps extends NumberInputProps {
  handleChangeRating: () => void;
}

const CustomNumberInput: FC<CustomNumberInputProps> = ({
  handleChangeRating,
  ...props
}) => {
  return (
    <NumberInput
      classNames={{
        root: classes.number_input_root,
        wrapper: classes.number_input_root,
        controls: classes.number_input_controls,
        control: classes.number_input_control,
      }}
      min={0}
      max={10}
      step={0.1}
      allowNegative={false}
      onValueChange={handleChangeRating}
      clampBehavior="strict"
      {...props}
    />
  );
};

export default CustomNumberInput;
