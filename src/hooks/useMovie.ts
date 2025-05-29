import { useQuery } from "@tanstack/react-query";
import ApiClient from "@/services/api-client";
import { MovieDetails } from "../interfaces/MovieDetails";
import ms from "ms";

const useMovie = (movieId: number) => {
  const apiClient = new ApiClient<MovieDetails>("/movie/" + movieId);

  const { data, error, isLoading } = useQuery<MovieDetails, Error>({
    queryKey: ["movie", movieId],
    queryFn: apiClient.get,
    staleTime: ms("2h"),
  });
  return { movie: data, error, isLoading };
};
export default useMovie;
