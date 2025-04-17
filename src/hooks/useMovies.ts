import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { FetchResponse } from "../interfaces/FetchResponse";
import { Movie } from "@/interfaces/Movie";

const useMovies = (
  page: number,
  endpoint: "popular" | "top_rated" | "upcoming" | "now_playing"
) => {
  const { data, error, isLoading } = useQuery<FetchResponse<Movie>, Error>({
    queryKey: ["movies", page, endpoint],
    queryFn: async () => {
      return apiClient
        .get<FetchResponse<Movie>>(`/movie/${endpoint}`, { params: { page } })
        .then((res) => res.data);
    },
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });
  const movies = data?.results;
  return { movies, error, isLoading };
};

export default useMovies;
