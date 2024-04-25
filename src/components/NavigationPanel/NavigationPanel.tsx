import { NavLink } from "@mantine/core";
import { useRouter } from "next/router";
import navigationItems from "./navigationPanelInfo";
import styles from "./NavigationPanel.module.css";

const NavigationPanel = () => {
  const router = useRouter();

  // console.log("Render nav panel");

  const handleClick = (path: string) => {
    // console.log("URL: ", router.pathname, "NAV: ", path);
    router.pathname !== path && router.push(path);
  };

  return (
    <nav>
      {navigationItems.map((item) => (
        <NavLink
          className={styles.nav_link}
          key={item.id}
          active={item.path === router.pathname}
          label={item.label}
          onClick={() => handleClick(item.path)}
          // color="pink"
          // variant="filled"
        />
      ))}
    </nav>
  );
};

export default NavigationPanel;
