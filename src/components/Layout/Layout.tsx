import { FC, ReactNode } from "react";
import NavigationPanel from "../NavigationPanel/NavigationPanel";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <NavigationPanel />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
