import { FetchResponse } from "@/interfaces/FetchResponse";
import { Movie } from "@/interfaces/Movie";
import ApiClient from "@/services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import TvSeries from "@/interfaces/TvSeries";

type SearchType = {
  movie: Movie;
  tv: TvSeries;
};

const useSearchResponse = <T extends keyof SearchType>(search_type: T) => {
  type MediaType = SearchType[T];
  const apiClient = new ApiClient<MediaType>("/search/" + search_type);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const res = useInfiniteQuery<FetchResponse<MediaType>, Error>({
    queryKey: ["search", query, search_type],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => apiClient.getAll({ params: { query, page: pageParam } }),

    getNextPageParam: (lastPage, pages) => {
      if (lastPage.results.length === 0) return undefined;
      return pages.length + 1;
    },
  });

  const resCount =
    res.data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  return { ...res, resCount };
};
export default useSearchResponse;
