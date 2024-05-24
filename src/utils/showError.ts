import { ERROR_COLOR } from "@/constants/colorConstants";
import { notifications } from "@mantine/notifications";

const showError = (title: string | number, message: string) => {
  notifications.show({
    title,
    message,
    color: ERROR_COLOR,
  });
};

export default showError;
