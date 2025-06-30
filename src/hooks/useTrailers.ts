import { useQuery } from "@tanstack/react-query";
import { Trailer } from "@/interfaces/Trailer";
import { FetchResponse } from "@/interfaces/FetchResponse";
import ms from "ms";
import createClient from "@/services/client";

const { VITE_USE_TMDB_CLIENT } = import.meta.env;

const useTrailers = (movieId: number) => {
  const computedEndpoint = VITE_USE_TMDB_CLIENT
    ? `/movie/${movieId}/videos`
    : `/movie/videos/${movieId}`;

  const client = createClient<Trailer>(computedEndpoint);

  const { data, error, isLoading } = useQuery<FetchResponse<Trailer>, Error>({
    queryKey: ["trailer", movieId],
    queryFn: client.getAll,
    staleTime: ms("2h"),
  });
  const trailers = data?.results;
  return { trailers, error, isLoading };
};
export default useTrailers;
