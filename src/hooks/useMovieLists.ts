import { useInfiniteQuery } from "@tanstack/react-query";
import { Movie } from "@/interfaces/Movie";
import { FetchResponse } from "@/interfaces/FetchResponse";
import ms from "ms";
import createClient from "@/services/client";

export type MovieTags = "now_playing" | "popular" | "top_rated" | "upcoming";
const { VITE_USE_TMDB_CLIENT } = import.meta.env;

const useMovieLists = (endpoint: MovieTags) => {
  const computedEndpoint = VITE_USE_TMDB_CLIENT
    ? `/movie/${endpoint}`
    : `/movie/tag/${endpoint}`;

  const client = createClient<Movie>(computedEndpoint);

  const res = useInfiniteQuery<FetchResponse<Movie>>({
    queryKey: ["movies", endpoint],
    initialPageParam: 1,
    staleTime: ms("2h"),
    queryFn: ({ pageParam }) => client.getAll({ params: { page: pageParam } }),

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.results.length ? allPages.length + 1 : undefined;
    },
  });

  const resCount =
    res.data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  return { ...res, resCount };
};
export default useMovieLists;
