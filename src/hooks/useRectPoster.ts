import createClient from "@/services/client";
import { useQuery } from "@tanstack/react-query";
import { getPoster } from "@/components/constants";
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
interface Poster {
  images: {
    backdrops: Backdrop[];
  };
}

const useRectPoster = (id: number, type: "movie" | "tv") => {
  const client = createClient<Poster>(`/poster/${type}/${id}`);

  const handleData = (data: Poster) => {
    const backdrops = data.images.backdrops;

    const isWideBackdrop = (b: Backdrop) => b.aspect_ratio > 1.7 && b.aspect_ratio < 1.9;

    const backdrop =
      backdrops.find((b) => isWideBackdrop(b) && b.iso_3166_1 === "US") ??
      backdrops.find(isWideBackdrop);

    const path = backdrop?.file_path || "";
    return getPoster(path, "w780");
  };

  return useQuery({
    queryKey: ["rectPoster", id, type],
    queryFn: client.get,
    select: handleData,
    staleTime: ms("2h"),
    refetchOnWindowFocus: false,
  });
};

export default useRectPoster;
