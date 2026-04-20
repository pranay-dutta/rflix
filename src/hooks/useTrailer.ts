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

const useTrailer = (
  type: "movie" | "tv",
  isInView: boolean,
  imdbId?: string,
  quality?: "1080p" | "480p",
) => {
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

      const trailer =
        stream?.urls?.find((url) => url.quality === quality) ??
        stream?.urls?.find((url) => url.quality === "720p"); //fallback to 720p if the desired quality is not available

      return trailer?.url;
    },
    staleTime: ms("2h"),
    enabled: isInView && !!imdbId,
  });
};

export default useTrailer;
