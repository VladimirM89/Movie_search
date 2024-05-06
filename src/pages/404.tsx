import { ALT_404_PAGE_IMG } from "@/constants/constants";
import { NotFoundPageImage } from "../../public/images";
import Image from "next/image";
import StandardButton from "@/components/UI/Button/StandardButton";
import { useRouter } from "next/router";
import { PATH } from "@/constants/enums";
import { useCallback } from "react";

export default function NotFoundPage() {
  const router = useRouter();

  const navigateToMain = useCallback(() => {
    router.push(PATH.HOME);
  }, [router]);

  return (
    <div>
      <Image src={NotFoundPageImage} alt={ALT_404_PAGE_IMG} />
      <p>We can’t find the page you are looking for</p>
      <StandardButton text="Go Home" size="md" onClick={navigateToMain} />
    </div>
  );
}
