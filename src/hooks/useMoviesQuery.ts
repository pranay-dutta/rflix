import { FetchResponse } from "@/interfaces/FetchResponse";
import { Movie } from "@/interfaces/Movie";
import axiosInstance from "@/services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const useMoviesQuery = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  return useInfiniteQuery<FetchResponse<Movie>, Error>({
    queryKey: ["search", query],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      return axiosInstance
        .get<FetchResponse<Movie>>("/search/movie?", {
          params: { query: query, page: pageParam },
        })
        .then((res) => res.data);
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.results.length === 0) return undefined;
      return pages.length + 1;
    },
  });
};
export default useMoviesQuery;
