import { Modal, Rating, getThemeColor, useMantineTheme } from "@mantine/core";
import StandardButton from "../UI/Button/StandardButton";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { MANTINE_COLOR_YELLOW_6 } from "@/constants/colorConstants";
import { RATING_MODAL_TITLE } from "@/constants/constants";

type RatingModalProps = {
  title: string;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  opened: boolean;
  close: Dispatch<void>;
};

const RatingModal: FC<RatingModalProps> = ({
  title,
  rating,
  setRating,
  close,
  opened,
}) => {
  const [value, setValue] = useState<number>(rating);

  const theme = useMantineTheme();
  const colorYellow = getThemeColor(MANTINE_COLOR_YELLOW_6, theme);

  const saveRating = () => {
    setRating(value);
    close();
  };

  const handleCloseModal = () => {
    close();
    setValue(rating);
  };
  return (
    <Modal
      closeButtonProps={{ size: "sm" }}
      opened={opened}
      onClose={handleCloseModal}
      title={RATING_MODAL_TITLE}
      radius={"md"}
      size={"sm"}
    >
      <p>{title}</p>
      <Rating
        value={value}
        onChange={setValue}
        count={10}
        color={colorYellow}
        size="lg"
      />
      <StandardButton
        text="Save"
        size="md"
        onClick={saveRating}
      ></StandardButton>
    </Modal>
  );
};

export default RatingModal;
