import { TvSeriesDetails } from "@/interfaces/TvSeriesDetails";
import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

// Returns the details of a single tv series
const useTvSeriesDetails = (seriesId: number) => {
  const apiClient = new ApiClient<TvSeriesDetails>("/tv/" + seriesId);

  return useQuery<TvSeriesDetails, Error>({
    queryKey: ["series", seriesId],
    queryFn: apiClient.get,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export default useTvSeriesDetails;
