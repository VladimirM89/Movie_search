import { FC, ReactNode } from "react";
import NavigationPanel from "../NavigationPanel";
import classes from "./styles.module.css";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={classes.page_content}>
      <div className={classes.wrapper}>
        <NavigationPanel />
        {<main className={classes.main_content}>{children}</main>}
      </div>
    </div>
  );
};

export default Layout;
