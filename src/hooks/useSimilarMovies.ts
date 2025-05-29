import { FetchResponse } from "@/interfaces/FetchResponse";
import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "../interfaces/Movie";
import ms from "ms";

const useSimilarMovies = (page: number, movieId: number) => {
  const apiClient = new ApiClient<Movie>(`/movie/${movieId}/similar`);
  const { data, error, isLoading } = useQuery<FetchResponse<Movie>, Error>({
    queryKey: ["similarMovies", movieId],
    queryFn: () => apiClient.getAll({ params: { page } }),
    staleTime: ms('1d')
  });
  const similarMovies = data?.results;
  return { similarMovies, error, isLoading };
};
export default useSimilarMovies;
