import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import axiosInstance from "../services/api-client";

interface Genre {
  id: number;
  name: string;
}
interface FetchResponse<T> {
  genres: T[];
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<AxiosError>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const fetchGenres = async () => {
      await axiosInstance
        .get<FetchResponse<Genre>>("/genre/movie/list?language=en")
        .then(({ data }) => {
          setLoading(false);
          setGenres(data.genres);
        })
        .catch((error) => {
          if (error instanceof AxiosError) return;
          setLoading(false);
          setError(error);
        })
        .finally(() => {});
    };
    fetchGenres();
    return () => controller.abort();
  }, []);

  return { genres, error, isLoading, setGenres, setError, setLoading };
};

export default useGenres;
