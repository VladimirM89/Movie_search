import { LOCAL_STORAGE_MOVIES_KEY } from "@/constants/constants";
import { RatedMovie } from "@/types/Movies";
import { useCallback } from "react";

const useRatedMoviesLocalStorage = (key: string) => {
  const getAllItems = useCallback((): Array<RatedMovie> | undefined => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as Array<RatedMovie>) : undefined;
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  const handleChangeItem = useCallback(
    (value: RatedMovie) => {
      try {
        const movies = getAllItems() || [];

        if (movies.length) {
          const index = movies.findIndex((item) => item.id === value.id);
          if (index >= 0) {
            movies[index].userRating = value.userRating;
            localStorage.setItem(
              LOCAL_STORAGE_MOVIES_KEY,
              JSON.stringify(movies),
            );
          } else {
            localStorage.setItem(key, JSON.stringify([...movies, value]));
          }
        } else {
          localStorage.setItem(key, JSON.stringify([value]));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [getAllItems, key],
  );

  const getItemById = useCallback(
    (id: number): RatedMovie | undefined => {
      try {
        const movies = getAllItems();
        if (movies) {
          return movies.find((item) => item.id === id);
        }
        return undefined;
      } catch (error) {
        console.error(error);
      }
    },
    [getAllItems],
  );

  const removeItemById = useCallback(
    (id: number): void => {
      try {
        const movies = getAllItems();
        if (movies) {
          const filteredArr = movies.filter((item) => item.id !== id);
          localStorage.setItem(key, JSON.stringify(filteredArr));
          window.dispatchEvent(new StorageEvent("storage"));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [getAllItems, key],
  );

  return {
    getAllItems,
    getItemById,
    removeItemById,
    handleChangeItem,
  };
};

export default useRatedMoviesLocalStorage;
