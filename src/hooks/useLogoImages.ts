import { useQuery } from "@tanstack/react-query";
import { Images } from "../interfaces/Images";
import ms from "ms";
import createClient from "@/services/client";

const { VITE_USE_TMDB_CLIENT } = import.meta.env;

const useLogoImages = (movieId: number) => {
  const computedEndpoint = VITE_USE_TMDB_CLIENT
    ? `/movie/${movieId}/images`
    : `/movie/images/${movieId}`;

  const client = createClient<Images>(computedEndpoint);

  return useQuery<Images, Error>({
    staleTime: ms("1d"),
    queryKey: ["logoImages", movieId],
    queryFn: client.get,
  });
};

export default useLogoImages;
