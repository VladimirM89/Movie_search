import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  Divider,
  Modal,
  Rating,
  Title,
  getThemeColor,
  useMantineTheme,
} from "@mantine/core";
import { MANTINE_COLOR_YELLOW_6 } from "@/constants/colorConstants";
import StandardButton from "../UI/Button";
import {
  BUTTON_SAVE,
  RATING_MODAL_TITLE,
  REMOVE_RATING,
} from "@/constants/constants";
import classes from "./styles.module.css";

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

  const handleResetRating = () => {
    setValue(0);
    setRating(0);
    close();
  };

  return (
    <Modal
      classNames={{
        header: classes.modal_header,
        title: classes.modal_title,
        inner: classes.modal_inner,
        close: classes.modal_close,
      }}
      closeButtonProps={{ size: "sm" }}
      opened={opened}
      onClose={handleCloseModal}
      title={RATING_MODAL_TITLE}
      radius={"md"}
      size={"sm"}
      centered
      padding={0}
      trapFocus={false}
    >
      <Divider className={classes.divider} />
      <div className={classes.modal_content}>
        <Title order={5} className={classes.modal_title}>
          {title}
        </Title>
        <Rating
          classNames={{
            root: classes.rating_start_container,
          }}
          value={value}
          onChange={setValue}
          count={10}
          color={colorYellow}
          size="lg"
        />
        <div className={classes.buttons_container}>
          <StandardButton
            text={BUTTON_SAVE}
            btnSize="fat"
            onClick={saveRating}
          ></StandardButton>
          <p className={classes.reset_button} onClick={handleResetRating}>
            {REMOVE_RATING}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default RatingModal;
