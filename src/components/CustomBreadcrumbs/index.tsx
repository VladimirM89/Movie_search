import { useRouter } from "next/router";
import { FC, MouseEvent } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@mantine/core";
import {
  ATTRIBUTE_HREF,
  BREADCRUMBS_HOME_ELEMENT,
  DYNAMIC_IMPORT_PATH,
  URL_SEPARATOR,
} from "@/constants/constants";
import { PATH } from "@/constants/enums";
import classes from "./styles.module.css";

type BreadcrumdsItemsType = {
  id: number;
  title: string;
  link: string;
};

type CustomBreadcrumbsType = {
  title: string;
};

const CustomBreadcrumbs: FC<CustomBreadcrumbsType> = ({ title }) => {
  const router = useRouter();
  const pathArray = router.asPath.split(URL_SEPARATOR);

  const breadcrumbsItems = pathArray.map((item, index) => {
    const breadcrumb: BreadcrumdsItemsType = {
      id: index,
      title: item.length ? title : BREADCRUMBS_HOME_ELEMENT,
      link: item.length ? "" : PATH.HOME,
    };
    return breadcrumb;
  });

  const handleClickBreadcrumbsLink = (e: MouseEvent) => {
    if (e.currentTarget.getAttribute(ATTRIBUTE_HREF) === DYNAMIC_IMPORT_PATH) {
      e.preventDefault();
    }
  };

  const breadcrumbsElements = breadcrumbsItems.map((item) => (
    <Link href={item.link} key={item.id} onClick={handleClickBreadcrumbsLink}>
      {item.title}
    </Link>
  ));

  return (
    <Breadcrumbs
      classNames={{
        root: classes.breadcrumbs_root,
        breadcrumb: classes.breadcrumb,
      }}
    >
      {breadcrumbsElements}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
