import { NavLink } from "@mantine/core";
import { useRouter } from "next/router";
import navigationItems from "./navigationPanelInfo";
import styles from "./NavigationPanel.module.css";
import FlickIcon from "../UI/FlickIcon/FlickIcon";
import { PATH } from "@/constants/enums";

const NavigationPanel = () => {
  const router = useRouter();

  // console.log("Render nav panel");

  const handleClick = (path: string) => {
    router.pathname !== path && router.push(path);
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.navigation_header}>
        <FlickIcon />
        <span>ArrowFlicks</span>
      </div>
      <nav className={styles.navigation_list}>
        {navigationItems.map((item) => (
          <NavLink
            className={styles.nav_link}
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
