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

const useTrailer = (id: number, type: "movie" | "tv", isInView: boolean) => {
  const backendClient = createClient<TrailerResponse>("/trailer/" + id);
  const queryClient = useQueryClient();

  //Cancel the query if the card is not in view to save bandwidth and resources
  useEffect(() => {
    if (!isInView)
      queryClient.cancelQueries({ queryKey: ["trailer", id, type], exact: true });
  }, [id, isInView, queryClient, type]);

  return useQuery({
    queryKey: ["trailer", id, type],
    queryFn: ({ signal }) => backendClient.get({ params: { type }, signal }),
    staleTime: ms("2h"),
    select: (data) => {
      const stream = data.streams?.[0];
      const _480pURL = stream?.urls?.find((url) => url.quality === "480p");
      return _480pURL?.url;
    },
    enabled: isInView,
  });
};

export default useTrailer;
