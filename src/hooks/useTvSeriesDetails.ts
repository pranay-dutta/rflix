import { TvSeriesDetails } from "@/interfaces/TvSeriesDetails";
import axiosInstance from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

// Returns the details of a single tv series
const useTvSeriesDetails = (seriesId: number) => {
  return useQuery<TvSeriesDetails, Error>({
    queryKey: ["series", seriesId],
    queryFn: async () => {
      return axiosInstance
        .get<TvSeriesDetails>(`/tv/${seriesId}`)
        .then((res) => res.data);
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export default useTvSeriesDetails;
