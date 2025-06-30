import { FetchResponse } from "@/interfaces/FetchResponse";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { Movie } from "../interfaces/Movie";
import createClient from "@/services/client";

const { VITE_USE_TMDB_CLIENT } = import.meta.env;

const useSimilarMovies = (page: number, movieId: number) => {
  const computedEndpoint = VITE_USE_TMDB_CLIENT
    ? `/movie/${movieId}/similar`
    : `/movie/similar/${movieId}`;

  const client = createClient<Movie>(computedEndpoint);
  const { data, error, isLoading } = useQuery<FetchResponse<Movie>, Error>({
    queryKey: ["similarMovies", movieId],
    queryFn: () => client.getAll({ params: { page } }),
    staleTime: ms("1d"),
  });
  const similarMovies = data?.results;
  return { similarMovies, error, isLoading };
};
export default useSimilarMovies;
