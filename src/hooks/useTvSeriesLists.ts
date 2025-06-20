import { FetchResponse } from "@/interfaces/FetchResponse";
import TvSeries from "@/interfaces/TvSeries";
import BackendClient from "@/services/backend-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";

export type TvSeriesTags = "popular" | "top_rated" | "airing_today" | "on_the_air";

const useTvSeriesLists = (endpoint: TvSeriesTags) => {
  const backendClient = new BackendClient<TvSeries>("/tv/tag/" + endpoint);
  const res = useInfiniteQuery<FetchResponse<TvSeries>>({
    queryKey: [endpoint, "series"],
    initialPageParam: 1,
    staleTime: ms("2h"),
    queryFn: ({ pageParam = 1 }) => backendClient.getAll({ params: { page: pageParam } }),

    getNextPageParam(lastPage, allPages) {
      return lastPage.results.length ? allPages.length + 1 : undefined;
    },
  });
  const resCount =
    res.data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;
  return { ...res, resCount };
};
export default useTvSeriesLists;
