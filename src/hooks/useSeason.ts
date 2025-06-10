import { useQuery } from "@tanstack/react-query";
import Season from "@/interfaces/Season";
import ms from "ms";
import BackendClient from "@/services/backend-client";

const useSeason = (series_id: number, season_number: number) => {
  const backendClient = new BackendClient<Season>(`/tv/${series_id}/season/${season_number}`);
  return useQuery<Season, Error>({
    queryKey: [series_id, season_number],
    queryFn: backendClient.get,
    staleTime: ms("1d"),
  });
};

export default useSeason;
