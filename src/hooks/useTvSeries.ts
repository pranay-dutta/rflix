import { FetchResponse } from "@/interfaces/FetchResponse";
import TvSeries from "@/interfaces/TvSeries";
import ApiClient from "@/services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";

//not using
const useTvSeries = (endpoint: "popular" | "top_rated") => {
  const apiClient = new ApiClient<TvSeries>("/tv/" + endpoint);
  return useInfiniteQuery<FetchResponse<TvSeries>>({
    queryKey: [endpoint, "series"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({ params: { page: pageParam } }),

    getNextPageParam(lastPage, allPages) {
      return lastPage.results.length ? allPages.length + 1 : undefined;
    },
  });
};

export default useTvSeries;
