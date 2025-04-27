import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "../interfaces/Movie";
import { FetchResponse } from "../interfaces/FetchResponse";
import TvSeries from "@/interfaces/TvSeries";

type ResponseType = {
  movie: FetchResponse<Movie>;
  tv: FetchResponse<TvSeries>;
};

const useTrending = <T extends keyof ResponseType>(endpoint: T, time: "day" | "week") => {
  type ResponseData = ResponseType[T];
  const apiClient = new ApiClient<ResponseData>(`/trending/${endpoint}/${time}`);

  return useQuery<ResponseData, Error>({
    queryKey: ["movies", time],
    queryFn: apiClient.get,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });
};

export default useTrending;
