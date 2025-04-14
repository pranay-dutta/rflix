import { useQuery } from "@tanstack/react-query";
import { Movie } from "./useMovies";
import axiosInstance from "@/services/api-client";

interface FetchResponse {
  results: Movie[];
}

const useSimilarMovies = (page: number, movieId: number) => {
  const { data, error, isLoading } = useQuery<FetchResponse, Error>({
    queryKey: ["similarMovies", movieId],
    queryFn: async () => {
      return axiosInstance
        .get<FetchResponse>(`/movie/${movieId}/similar`, { params: { page } })
        .then((res) => res.data);
    },
  });
  const similarMovies = data?.results;
  return { similarMovies, error, isLoading };
};
export default useSimilarMovies;
