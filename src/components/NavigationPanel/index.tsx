import { useRouter } from "next/router";
import { NavLink } from "@mantine/core";
import navigationItems from "./navigationPanelInfo";
import { PATH } from "@/constants/enums";
import classes from "./styles.module.css";
import MainLogo from "../UI/MainLogo";

const NavigationPanel = () => {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.pathname !== path && router.push(path);
  };

  return (
    <div className={classes.navigation}>
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
