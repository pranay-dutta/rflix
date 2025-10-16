import { useQuery } from "@tanstack/react-query";
import { Credit } from "@/interfaces/Credit";
import createClient from "@/services/client";
import ms from "ms";

const useCasts = (movieId: string) => {
  const client = createClient<Credit>(`/movie/${movieId}/credits`);

  return useQuery({
    queryKey: ["casts", movieId],
    queryFn: () => client.get(),
    staleTime: ms("1d"),
  });
};

export default useCasts;
