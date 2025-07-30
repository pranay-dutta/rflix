import { useQuery } from "@tanstack/react-query";
import { Images } from "../interfaces/Images";
import ms from "ms";
import createClient, { isActiveTmdbClient } from "@/services/client";

const useLogoImages = (movieId: number) => {
  const computedEndpoint = isActiveTmdbClient
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
