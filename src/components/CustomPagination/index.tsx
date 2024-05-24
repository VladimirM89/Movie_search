import { Dispatch, FC, useCallback } from "react";
import { Group, Pagination } from "@mantine/core";
import { INITIAL_PAGE } from "@/constants/constants";
import classes from "./styles.module.css";

type CustomPaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: Dispatch<number>;
  position?: string;
};

const CustomPagination: FC<CustomPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  position,
}) => {
  const createPageArray = useCallback(() => {
    if (totalPages > 0 && totalPages < 3) return [1, 2];
    if (currentPage === INITIAL_PAGE) return [1, 2, 3];
    if (currentPage === totalPages)
      return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  }, [currentPage, totalPages]);

  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <Pagination.Root
      onPreviousPage={handlePreviousPage}
      onNextPage={handleNextPage}
      total={3}
      classNames={{ control: classes.pagination_control }}
    >
      <Group
        gap={8}
        justify={position || "center"}
        classNames={{ root: classes.group_root }}
      >
        <Pagination.Previous
          className={classes.control_edge}
          disabled={currentPage - 1 === 0}
        />
        {createPageArray().map((item) => (
          <Pagination.Control
            key={item}
            active={item === currentPage}
            onClick={() => onPageChange(item)}
          >
            {item}
          </Pagination.Control>
        ))}

        <Pagination.Next
          className={classes.control_edge}
          disabled={currentPage === totalPages}
        />
      </Group>
    </Pagination.Root>
  );
};

export default CustomPagination;
