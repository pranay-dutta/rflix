import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { FetchResponse } from "../interfaces/FetchResponse";
import { Movie } from "@/interfaces/Movie";

const useMovies = (
  page: number,
  endpoint: "popular" | "top_rated" | "upcoming" | "now_playing"
) => {
  const apiClient = new ApiClient<Movie>("/movie/" + endpoint);

  const { data, error, isLoading } = useQuery<FetchResponse<Movie>, Error>({
    queryKey: ["movies", page, endpoint],
    queryFn: () => apiClient.getAll({ params: { page } }),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });

  const movies = data?.results;
  return { movies, error, isLoading };
};

export default useMovies;
