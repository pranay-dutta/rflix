import { useQuery } from "@tanstack/react-query";
import { MovieDetails } from "../interfaces/MovieDetails";
import BackendClient from "@/services/backend-client";
import ms from "ms";

const useMovie = (movieId: number) => {
  const backendClient = new BackendClient<MovieDetails>("/movie/" + movieId);

  const { data, error, isLoading } = useQuery<MovieDetails, Error>({
    queryKey: ["movie", movieId],
    queryFn: backendClient.get,
    staleTime: ms("2h"),
  });

  return { movie: data, error, isLoading };
};
export default useMovie;
