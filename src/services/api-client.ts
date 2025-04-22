import { FetchResponse } from "@/interfaces/FetchResponse";
import axios, { AxiosRequestConfig } from "axios";
const { VITE_TMDB_API_KEY } = import.meta.env;

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: VITE_TMDB_API_KEY },
  headers: {
    Accept: "application/json",
  },
});

class ApiClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  get = async () => {
    return axiosInstance.get<T>(this.endpoint).then((res) => res.data);
  };
  getAll = async (params?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, params)
      .then((res) => res.data);
  };
}
export default ApiClient;
