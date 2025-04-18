import { FetchResponse } from "@/interfaces/FetchResponse";
import TvSeries from "@/interfaces/TvSeries";
import axiosInstance from "@/services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const useTvSeriesQuery = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  return useInfiniteQuery<FetchResponse<TvSeries>>({
    queryKey: ["tvSeries", query],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      return axiosInstance
        .get<FetchResponse<TvSeries>>("/search/tv?", {
          params: { query: query, page: pageParam },
        })
        .then((res) => res.data);
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.results.length ? pages.length + 1 : undefined;
    },
  });
};
export default useTvSeriesQuery;
