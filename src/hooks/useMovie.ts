import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/api-client";
import { MovieDetails } from "../interfaces/MovieDetails";

const useMovie = (movieId: number) => {
  const {
    data: movie,
    error,
    isLoading,
  } = useQuery<MovieDetails, Error>({
    queryKey: ["movie", movieId],
    queryFn: async () => {
      return axiosInstance
        .get<MovieDetails>("/movie/" + movieId)
        .then((res) => res.data);
    },
  });
  return { movie, error, isLoading };
};
export default useMovie;
