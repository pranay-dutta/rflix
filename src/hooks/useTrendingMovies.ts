import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "../interfaces/Movie";
import { FetchResponse } from "../interfaces/FetchResponse";

const useTrendingMovies = (time: "day" | "week") => {
  const { data, error, isLoading } = useQuery<FetchResponse<Movie>, Error>({
    queryKey: ["movies", time],
    queryFn: async () => {
      return apiClient
        .get<FetchResponse<Movie>>(`/trending/movie/${time}`)
        .then((res) => res.data);
    },
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });
  const movies = data?.results;
  return { movies, error, isLoading };
};

export default useTrendingMovies;