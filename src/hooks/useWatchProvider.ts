import { useQuery } from "@tanstack/react-query";
import createClient from "@/services/client";
import TvSeries from "@/interfaces/TvSeries";
import ms from "ms";

const useWatchProvider = (name: string) => {
  const client = createClient<TvSeries>("/discover/tv");

  return useQuery({
    queryKey: ["provider", name],
    queryFn: () => client.getAll({ params: { with_networks: name } }),
    staleTime: ms("2h"),
  });
};

export default useWatchProvider;
