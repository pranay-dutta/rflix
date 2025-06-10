import { useQuery } from "@tanstack/react-query";
import { Trailer } from "@/interfaces/Trailer";
import { FetchResponse } from "@/interfaces/FetchResponse";
import ms from "ms";
import BackendClient from "@/services/backend-client";

const useTrailers = (movieId: number) => {
  const backendClient = new BackendClient<Trailer>(`/movie/videos/${movieId}`);

  const { data, error, isLoading } = useQuery<FetchResponse<Trailer>, Error>({
    queryKey: ["trailer", movieId],
    queryFn: backendClient.getAll,
    staleTime: ms("2h"),
  });
  const trailers = data?.results;
  return { trailers, error, isLoading };
};
export default useTrailers;
