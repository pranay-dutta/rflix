import { FetchResponse } from "@/interfaces/FetchResponse";
import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tmdb-backend-9jo1.onrender.com",
});

class BackendClient<T> {
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
export default BackendClient;
