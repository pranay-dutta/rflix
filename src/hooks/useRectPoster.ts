import createClient from "@/services/client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

export interface Backdrop {
  aspect_ratio: number;
  height: number;
  iso_3166_1: string;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
export interface PosterAndExternalIds {
  images: {
    backdrops: Backdrop[];
  };
  external_ids: {
    imdb_id: string;
  };
}

const useRectPoster = (id: number, type: "movie" | "tv") => {
  const client = createClient<PosterAndExternalIds>(`/poster/${type}/${id}`);

  return useQuery({
    queryKey: ["rectPoster", id, type],
    queryFn: client.get,
    staleTime: ms("2h"),
    refetchOnWindowFocus: false,
  });
};

export default useRectPoster;
