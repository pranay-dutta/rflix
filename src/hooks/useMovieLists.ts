import { useInfiniteQuery } from "@tanstack/react-query";
import { Movie } from "@/interfaces/Movie";
import ApiClient from "@/services/api-client";
import { FetchResponse } from "@/interfaces/FetchResponse";
import ms from "ms";

export type MovieTags = "now_playing" | "popular" | "top_rated" | "upcoming";
const useMovieLists = (endpoint: MovieTags) => {
  const apiClient = new ApiClient<Movie>("/movie/" + endpoint);

  const res = useInfiniteQuery<FetchResponse<Movie>>({
    queryKey: ["movies", endpoint],
    initialPageParam: 1,
    staleTime: ms("2h"),
    queryFn: ({ pageParam }) => apiClient.getAll({ params: { page: pageParam } }),

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.results.length ? allPages.length + 1 : undefined;
    },
  });

  const resCount =
    res.data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  return { ...res, resCount };
};
export default useMovieLists;
