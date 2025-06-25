import { FetchResponse } from "@/interfaces/FetchResponse";
import axios, { AxiosRequestConfig } from "axios";
const { VITE_BACKEND_CLIENT, VITE_DEV_BACKEND_CLIENT, DEV } = import.meta.env;

const axiosInstance = axios.create({
  baseURL: DEV ? VITE_DEV_BACKEND_CLIENT : VITE_BACKEND_CLIENT,
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
