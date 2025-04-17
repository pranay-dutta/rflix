import { useQuery } from "@tanstack/react-query";
import { Movie } from "../interfaces/Movie";
import axiosInstance from "@/services/api-client";
import { FetchResponse } from "@/interfaces/FetchResponse";

const useSimilarMovies = (page: number, movieId: number) => {
  const { data, error, isLoading } = useQuery<FetchResponse<Movie>, Error>({
    queryKey: ["similarMovies", movieId],
    queryFn: async () => {
      return axiosInstance
        .get<FetchResponse<Movie>>(`/movie/${movieId}/similar`, { params: { page } })
        .then((res) => res.data);
    },
  });
  const similarMovies = data?.results;
  return { similarMovies, error, isLoading };
};
export default useSimilarMovies;
