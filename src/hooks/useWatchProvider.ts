import { useQuery } from "@tanstack/react-query";
import createClient from "@/services/client";
import TvSeries from "@/interfaces/TvSeries";
import ms from "ms";

const useWatchProvider = (name: string) => {
  const client = createClient<TvSeries>("/discover/tv");

  const { data, isLoading, error } = useQuery({
    queryKey: ["provider", name],
    queryFn: () => client.getAll({ params: { with_networks: name } }),
    staleTime: ms("2h"),
  });

  const filteredData = data?.results.filter((series) => series.poster_path);

  return { data: filteredData, isLoading, error };
};

export default useWatchProvider;
