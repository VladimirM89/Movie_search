import { useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  ALT_404_PAGE_IMG,
  BUTTON_GO_HOME,
  NO_FOUND_PAGE_TEXT,
} from "@/constants/constants";
import StandardButton from "@/components/UI/Button";
import { PATH } from "@/constants/enums";
import { NotFoundPageImage } from "../../public/images";
import NotFound from "@/components/NotFound";
import MainLogo from "@/components/UI/MainLogo";
import classes from "../styles/404.module.css";

export default function CustomNotFound() {
  const router = useRouter();

  const navigateToMain = useCallback(() => {
    router.push(PATH.HOME);
  }, [router]);

  return (
    <>
      <Head>
        <title>Movie Search App</title>
        <meta name="description" content="Not found page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <div className={["wrapper", classes.wrapper_not_found_page].join(" ")}>
        <MainLogo />
        <div className={classes.content}>
          <NotFound
            className={classes.inner_block_content}
            img={NotFoundPageImage}
            width={656}
            height={196}
            alt={ALT_404_PAGE_IMG}
            text={NO_FOUND_PAGE_TEXT}
          >
            <StandardButton
              text={BUTTON_GO_HOME}
              btnSize="fat"
              onClick={navigateToMain}
            />
          </NotFound>
        </div>
      </div>
    </>
  );
}
