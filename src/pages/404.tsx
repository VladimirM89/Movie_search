import { useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import {
  ALT_404_PAGE_IMG,
  BUTTON_GO_HOME,
  NO_FOUND_PAGE_TEXT,
} from "@/constants/constants";
import { PATH } from "@/constants/enums";
import { NotFoundPageImage } from "../../public/images";
import StandardButton from "@/components/UI/Button";
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
          <Image
            className={classes.not_found_image}
            src={NotFoundPageImage}
            width={656}
            height={196}
            alt={ALT_404_PAGE_IMG}
            priority={true}
          />
          <div className={classes.description}>
            <p className={classes.description_text}>{NO_FOUND_PAGE_TEXT}</p>
            <StandardButton
              text={BUTTON_GO_HOME}
              btnSize="fat"
              onClick={navigateToMain}
            />
          </div>
        </div>
      </div>
    </>
  );
}
