import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "@/theme";
import { NOTIFICATION_AUTOCLOSE_TIME } from "@/constants/constants";
import { PATH } from "@/constants/enums";
import "@mantine/core/styles.css";
import Layout from "@/components/Layout";
import "@mantine/notifications/styles.css";
import "@/styles/fonts.css";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <MantineProvider theme={theme}>
      <Notifications autoClose={NOTIFICATION_AUTOCLOSE_TIME} />
      {router.pathname !== PATH.NOT_FOUND ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </MantineProvider>
  );
}
