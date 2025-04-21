import { FetchResponse } from "@/interfaces/FetchResponse";
import { Movie } from "@/interfaces/Movie";
import ApiClient from "@/services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const apiClient = new ApiClient<Movie>("/search/movie");

const useMoviesQuery = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  return useInfiniteQuery<FetchResponse<Movie>, Error>({
    queryKey: ["search", query],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      apiClient.getAll({ params: { query, page: pageParam } }),

    getNextPageParam: (lastPage, pages) => {
      if (lastPage.results.length === 0) return undefined;
      return pages.length + 1;
    },
  });
};
export default useMoviesQuery;
