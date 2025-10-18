import { useQuery } from "@tanstack/react-query";
import { Credit } from "@/interfaces/Credit";
import createClient, { isActiveTmdbClient } from "@/services/client";
import ms from "ms";

const useCredits = (mediaId: string, isTvShow: boolean) => {
  const computedEndpoint = isActiveTmdbClient
    ? (isTvShow ? `/tv/${mediaId}/credits` : `/movie/${mediaId}/credits`)
    : (isTvShow ? `tv/credits/${mediaId}` : `/movie/credits/${mediaId}`);

  const client = createClient<Credit>(computedEndpoint);

  return useQuery({
    queryKey: ["credits", mediaId],
    queryFn: () => client.get(),
    staleTime: ms("1d"),
  });
};

export default useCredits;
