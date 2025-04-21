import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import Season from "@/interfaces/Season";

const useSeason = (series_id: number, season_number: number) => {
  const apiClient = new ApiClient<Season>(
    `/tv/${series_id}/season/${season_number}`
  );
  return useQuery<Season, Error>({
    queryKey: [series_id, season_number],
    queryFn: apiClient.get,
    staleTime: 60 * 1000 * 60 * 24, //1d
  });
};

export default useSeason;
