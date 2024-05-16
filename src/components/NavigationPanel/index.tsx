import { useRouter } from "next/router";
import { NavLink } from "@mantine/core";
import navigationItems from "./navigationPanelInfo";
import { PATH } from "@/constants/enums";
import classes from "./styles.module.css";
import MainLogo from "../UI/MainLogo";

const NavigationPanel = () => {
  const router = useRouter();

  // console.log("Render nav panel");

  const handleClick = (path: string) => {
    router.pathname !== path && router.push(path);
  };

  return (
    <div className={classes.navigation}>
      {/* <div className={classes.navigation_header}>
        <MainLogoImage />
        <Title order={3}>{NAVIGATION_HEADER}</Title>
      </div> */}
      <MainLogo />
      <nav className={classes.navigation_list}>
        {navigationItems.map((item) => (
          <NavLink
            classNames={{
              root: classes.nav_link_root,
              label: classes.nav_link_label,
            }}
            key={item.id}
            active={
              item.path === (router.query.id ? PATH.HOME : router.pathname)
            }
            label={item.label}
            onClick={() => handleClick(item.path)}
          />
        ))}
      </nav>
    </div>
  );
};

export default NavigationPanel;
