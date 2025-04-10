import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

export interface Movie {
  id: number;
  adult: boolean;
  backdrop_path: string;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  original_language: string;
}
interface FetchResponse {
  results: Movie[];
}
const useMovies = (
  page: number,
  endpoint: "popular" | "top_rated" | "upcoming" | "now_playing"
) => {
  const { data, error, isLoading } = useQuery<FetchResponse, Error>({
    queryKey: ["movies", page, endpoint],
    queryFn: async () => {
      return apiClient
        .get<FetchResponse>(`/movie/${endpoint}`, { params: { page } })
        .then((res) => res.data);
    },
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });
  const movies = data?.results;
  return { movies, error, isLoading };
};

export default useMovies;
