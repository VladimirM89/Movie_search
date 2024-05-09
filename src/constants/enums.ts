/* eslint-disable no-unused-vars */
export enum PATH {
  HOME = "/",
  RATING = "/rating",
  NOT_FOUND = "/404",
}

export enum API_ENDPOINTS {
  ALL_MOVIES = "discover/movie",
  MOVIE = "movie",
  GENRE = "genre/movie/list",
}

export enum STATUS_CODE {
  OK = 200,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum PROXY_ENDPOINTS {
  ALL_MOVIES = "api/movies",
  MOVIE = "api/movie",
  GENRE = "api/genres",
}
