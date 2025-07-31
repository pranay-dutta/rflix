import { useQuery } from "@tanstack/react-query";
import { Trailer } from "@/interfaces/Trailer";
import { FetchResponse } from "@/interfaces/FetchResponse";
import ms from "ms";
import createClient, { isActiveTmdbClient } from "@/services/client";

const useTvSeriesTrailer = (tvSeriesId: number) => {
  const computedEndpoint = isActiveTmdbClient
    ? `/tv/${tvSeriesId}/videos`
    : `/tv/videos/${tvSeriesId}`;

  const client = createClient<Trailer>(computedEndpoint);

  const { data, error, isLoading } = useQuery<FetchResponse<Trailer>, Error>({
    queryKey: ["tv trailer", tvSeriesId],
    queryFn: client.getAll,
    staleTime: ms("2h"),
  });
  const trailers = data?.results;
  return { trailers, error, isLoading };
};
export default useTvSeriesTrailer;
