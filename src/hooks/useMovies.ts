import apiClient from "@/services/api-client";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface Movie {
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  ote_count: 1456;
}

interface FetchResponse {
  page: number;
  results: Movie[];
}
const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<AxiosError>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const fetchMovies = async () => {
      await apiClient
        .get<FetchResponse>("/movie/now_playing?language=en-US&page=1")
        .then(({ data }) => {
          setLoading(false);
          setMovies(data.results);
        })
        .catch((error) => {
          if (error instanceof AxiosError) return;
          setLoading(false);
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchMovies();
    return () => {
      controller.abort();
    };
  }, []);
  return { movies, error, isLoading };
};

export default useMovies;
