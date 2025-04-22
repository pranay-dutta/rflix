import { FetchResponse } from "@/interfaces/FetchResponse";
import TvSeries from "@/interfaces/TvSeries";
import ApiClient from "@/services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";

const useTvSeriesLists = (
  endpoint: "popular" | "top_rated" | "airing_today" | "on_the_air"
) => {
  const apiClient = new ApiClient<TvSeries>("/tv/" + endpoint);
  const res = useInfiniteQuery<FetchResponse<TvSeries>>({
    queryKey: [endpoint, "series"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({ params: { page: pageParam } }),

    getNextPageParam(lastPage, allPages) {
      return lastPage.results.length ? allPages.length + 1 : undefined;
    },
  });
  const resCount =
    res.data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;
  return { ...res, resCount };
};
export default useTvSeriesLists;