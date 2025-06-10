import { FetchResponse } from "@/interfaces/FetchResponse";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "../interfaces/Movie";
import ms from "ms";
import BackendClient from "@/services/backend-client";

const useSimilarMovies = (page: number, movieId: number) => {
  const backendClient = new BackendClient<Movie>("/movie/similar/" + movieId);
  const { data, error, isLoading } = useQuery<FetchResponse<Movie>, Error>({
    queryKey: ["similarMovies", movieId],
    queryFn: () => backendClient.getAll({ params: { page } }),
    staleTime: ms("1d"),
  });
  const similarMovies = data?.results;
  return { similarMovies, error, isLoading };
};
export default useSimilarMovies;
