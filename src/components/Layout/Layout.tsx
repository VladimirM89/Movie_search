import { FC, ReactNode, useEffect, useState } from "react";
import NavigationPanel from "../NavigationPanel/NavigationPanel";
import styles from "./Layout.module.css";
import router from "next/router";
import { Loader } from "@mantine/core";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeError", handleComplete);
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, []);

  return (
    <div className={styles.page_content}>
      <div className={styles.wrapper}>
        <NavigationPanel />
        {isLoading ? <Loader /> : <main>{children}</main>}
      </div>
    </div>
  );
};

export default Layout;
