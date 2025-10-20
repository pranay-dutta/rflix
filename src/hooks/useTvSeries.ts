import TvSeries from "@/interfaces/TvSeries";
import { TvSeriesDetails } from "@/interfaces/TvSeriesDetails";
import { useQuery } from "@tanstack/react-query";
import { FetchResponse } from "@/interfaces/FetchResponse";
import ms from "ms";
import createClient from "@/services/client";

type ResponseType = {
  details: TvSeriesDetails;
  similar: FetchResponse<TvSeries>;
};
const useTvSeries = <T extends keyof ResponseType>(seriesId: number, endpoint?: T) => {
  type ResponseData = ResponseType[T];
  const newEndpoint = endpoint === "details" ? "" : "/" + endpoint;

  const client = createClient<ResponseData>("/tv/" + seriesId + newEndpoint);

  return useQuery<ResponseData, Error>({
    queryKey: ["series", seriesId, endpoint],
    queryFn: client.get,
    staleTime: ms("2h"),
    enabled: seriesId !== 0,
  });
};

export default useTvSeries;
