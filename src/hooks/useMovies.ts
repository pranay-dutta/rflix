import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

export interface Movie {
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

interface FetchResponse {
  results: Movie[];
}
const useMovies = (page: number) => {
  return useQuery<FetchResponse, Error>({
    queryKey: ["movies", page],
    queryFn: async () => {
      return await apiClient
        .get<FetchResponse>("/movie/popular", { params: { page } })
        .then((res) => res.data);
    },
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });
};

export default useMovies;
