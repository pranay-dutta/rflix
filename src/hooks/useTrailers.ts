import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { Trailer } from "@/interfaces/Trailer";
import { FetchResponse } from "@/interfaces/FetchResponse";
import ms from "ms";

const useTrailers = (movieId: number) => {
  const apiClient = new ApiClient<Trailer>(`/movie/${movieId}/videos`);

  const { data, error, isLoading } = useQuery<FetchResponse<Trailer>, Error>({
    queryKey: ["trailer", movieId],
    queryFn: apiClient.getAll,
    staleTime: ms('2h')
  });
  const trailers = data?.results;
  return { trailers, error, isLoading };
};
export default useTrailers;
