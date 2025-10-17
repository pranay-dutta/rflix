import { useQuery } from "@tanstack/react-query";
import { Credit } from "@/interfaces/Credit";
import createClient from "@/services/client";
import ms from "ms";

const useCredits = (mediaId: string, isTvShow: boolean) => {
  const client = createClient<Credit>(
    isTvShow ? `/tv/${mediaId}/credits` : `/movie/${mediaId}/credits`,
  );

  return useQuery({
    queryKey: ["credits", mediaId],
    queryFn: () => client.get(),
    staleTime: ms("1d"),
  });
};

export default useCredits;
