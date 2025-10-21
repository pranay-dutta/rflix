import { useQuery } from "@tanstack/react-query";
import createClient from "@/services/client";
import TvSeries from "@/interfaces/TvSeries";
import ms from "ms";

export type WatchProviderType =
  | "netflix"
  | "prime"
  | "hbo max"
  | "disney+"
  | "apple tv"
  | "paramount+";

const WatchProviderMap = new Map<WatchProviderType, string>([
  ["netflix", "213"],
  ["prime", "1024"],
  ["hbo max", "3186"],
  ["disney+", "2739"],
  ["apple tv", "350"],
  ["paramount+", "4330"],
]);

const useWatchProvider = (name: WatchProviderType) => {
  const client = createClient<TvSeries>("/discover/tv");

  return useQuery({
    queryKey: [name],
    queryFn: () =>
      client.getAll({
        params: {
          with_networks: WatchProviderMap.get(name) || "",
          sort_by: "popularity.desc",
        },
      }),
    staleTime: ms("2h"),
  });
};

export default useWatchProvider;
