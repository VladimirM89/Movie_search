import { NAVIGATION_HEADER } from "@/constants/constants";
import { Title } from "@mantine/core";
import { MainLogoImage } from "../../../../public/images";
import classes from "./styles.module.css";

const MainLogo = () => {
  return (
    <div className={classes.logo_container}>
      <MainLogoImage />
      <Title order={3}>{NAVIGATION_HEADER}</Title>
    </div>
  );
};

export default MainLogo;
