import { ALT_404_PAGE_IMG } from "@/constants/constants";
import { NotFoundPageImage } from "../../public/images";
import Image from "next/image";
import StandardButton from "@/components/UI/Button";
import { useRouter } from "next/router";
import { PATH } from "@/constants/enums";
import { useCallback } from "react";
import Head from "next/head";

export default function NotFound() {
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
      <div>
        <Image src={NotFoundPageImage} alt={ALT_404_PAGE_IMG} priority={true} />
        <p>We can’t find the page you are looking for</p>
        <StandardButton text="Go Home" onClick={navigateToMain} />
      </div>
    </>
  );
}
