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
        root: classes.numberinput_root,
        wrapper: classes.numberinput_root,
        control: classes.numberinput_control,
      }}
      // key={form.key("vote_average-gte")}
      // {...form.getInputProps("vote_average-gte")}
      // label={LABEL_RATINGS}
      min={0}
      max={10}
      step={0.1}
      placeholder="From"
      allowNegative={false}
      onValueChange={handleChangeRating}
      {...props}
    />
  );
};

export default CustomNumberInput;
