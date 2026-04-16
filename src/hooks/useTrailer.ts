import createClient from "@/services/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { useEffect } from "react";

export interface TrailerResponse {
  streams: Stream[];
}

export interface Stream {
  id: string;
  name: string;
  type: string;
  runtime: number;
  thumbnail: string;
  urls: TrailerUrl[];
}

export interface TrailerUrl {
  quality: string;
  url: string;
}

const useTrailer = (type: "movie" | "tv", isInView: boolean, imdbId?: string) => {
  const backendClient = createClient<TrailerResponse>("/trailer/" + imdbId);
  const queryClient = useQueryClient();

  //Cancel the query if the card is not in view to save bandwidth and resources
  useEffect(() => {
    if (!isInView)
      queryClient.cancelQueries({ queryKey: ["trailer", type, imdbId], exact: true });
  }, [imdbId, isInView, queryClient, type]);

  return useQuery({
    queryKey: ["trailer", type, imdbId],
    queryFn: ({ signal }) => backendClient.get({ signal }),
    select: (data) => {
      const stream = data.streams?.[0];
      const _480pURL = stream?.urls?.find((url) => url.quality === "480p");
      return _480pURL?.url;
    },
    staleTime: ms("2h"),
    enabled: isInView && !!imdbId,
  });
};

export default useTrailer;
