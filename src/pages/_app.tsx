import { Loader, MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import "@mantine/core/styles.css";
import { theme } from "@/theme";
import Layout from "@/components/Layout/Layout";
import router from "next/router";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
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
    <MantineProvider theme={theme}>
      {isLoading ? (
        <Loader />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </MantineProvider>
  );
}
