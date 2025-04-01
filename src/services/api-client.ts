import axios from "axios";
const { VITE_TMDB_ACCESS_AUTH_TOKEN } = import.meta.env;

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + VITE_TMDB_ACCESS_AUTH_TOKEN,
  },
});

export default axiosInstance;
