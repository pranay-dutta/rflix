import { useQuery } from "@tanstack/react-query";
import { Images } from "../interfaces/Images";
import ms from "ms";
import createClient from "@/services/client";

const { DEV } = import.meta.env;

const useLogoImages = (movieId: number) => {
  const computedEndpoint = DEV ? `/movie/${movieId}/images` : `/movie/images/${movieId}`;
  const client = createClient<Images>(computedEndpoint);

  return useQuery<Images, Error>({
    staleTime: ms("1d"),
    queryKey: ["logoImages", movieId],
    queryFn: client.get,
  });
};

export default useLogoImages;
