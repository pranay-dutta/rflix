import TvSeries from "@/interfaces/TvSeries";
import { TvSeriesDetails } from "@/interfaces/TvSeriesDetails";
import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { FetchResponse } from "@/interfaces/FetchResponse";
import ms from "ms";

type ResponseType = {
  details: TvSeriesDetails;
  similar: FetchResponse<TvSeries>;
};
const useTvSeries = <T extends keyof ResponseType>(seriesId: number, endpoint?: T) => {
  type ResponseData = ResponseType[T];
  const newEndpoint = endpoint === "details" ? undefined : "/" + endpoint;

  const apiClient = new ApiClient<ResponseData>("/tv/" + seriesId + newEndpoint);

  return useQuery<ResponseData, Error>({
    queryKey: ["series", seriesId, endpoint],
    queryFn: apiClient.get,
    staleTime: ms("2h"),
  });
};

export default useTvSeries;
