import { RatedMovie } from "@/models/RatedMovie";

const useRatedMoviesLocalStorage = (key: string) => {
  const setItem = (value: RatedMovie): void => {
    try {
      removeItemById(value.id);
      const movies = getAllItems();
      if (movies && movies.length) {
        localStorage.setItem(key, JSON.stringify([...movies, value]));
      } else {
        localStorage.setItem(key, JSON.stringify([value]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllItems = (): Array<RatedMovie> | undefined => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as Array<RatedMovie>) : undefined;
    } catch (error) {
      console.log(error);
    }
  };

  const getItemById = (id: number): RatedMovie | undefined => {
    try {
      const movies = getAllItems();
      if (movies) {
        return movies.find((item) => item.id === id);
      }
      return undefined;
    } catch (error) {
      console.log(error);
    }
  };

  const removeAllItems = (): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemById = (id: number): void => {
    try {
      const movies = getAllItems();
      if (movies) {
        const filteredArr = movies.filter((item) => item.id !== id);
        localStorage.setItem(key, JSON.stringify(filteredArr));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const length = localStorage.length;

  return {
    setItem,
    getAllItems,
    removeAllItems,
    getItemById,
    removeItemById,
    length,
  };
};

export default useRatedMoviesLocalStorage;
