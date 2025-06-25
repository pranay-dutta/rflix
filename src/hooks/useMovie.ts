import { useQuery } from "@tanstack/react-query";
import { MovieDetails } from "../interfaces/MovieDetails";
import ms from "ms";
import createClient from "@/services/client";

const useMovie = (movieId: number) => {
  const client = createClient<MovieDetails>("/movie/" + movieId);

  const { data, error, isLoading } = useQuery<MovieDetails, Error>({
    queryKey: ["movie", movieId],
    queryFn: client.get,
    staleTime: ms("2h"),
  });

  return { movie: data, error, isLoading };
};
export default useMovie;
