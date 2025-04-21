import { FetchResponse } from "@/interfaces/FetchResponse";
import TvSeries from "@/interfaces/TvSeries";
import ApiClient from "@/services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const apiClient = new ApiClient<TvSeries>("/search/tv");

//Returns multiple tv series
const useTvSeriesQuery = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<FetchResponse<TvSeries>>({
    queryKey: ["tvSeries", query],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) =>
      apiClient.getAll({ params: { query: query, page: pageParam } }),

    getNextPageParam: (lastPage, pages) => {
      return lastPage.results.length ? pages.length + 1 : undefined;
    },
  });
  const resCount =
    data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    resCount,
  };
};
export default useTvSeriesQuery;
