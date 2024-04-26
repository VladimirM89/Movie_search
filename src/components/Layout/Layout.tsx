import { FC, ReactNode } from "react";
import NavigationPanel from "../NavigationPanel/NavigationPanel";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.page_content}>
      <div className={styles.wrapper}>
        <NavigationPanel />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
