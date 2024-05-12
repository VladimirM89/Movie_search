import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { theme } from "@/theme";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import { Notifications } from "@mantine/notifications";
import { NOTIFICATION_AUTOCLOSE_TIME } from "@/constants/constants";
import { PATH } from "@/constants/enums";

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
