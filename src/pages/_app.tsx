import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import "@mantine/core/styles.css";
import { theme } from "@/theme";
import Layout from "@/components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
