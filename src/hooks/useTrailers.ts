import axiosInstance from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { Trailer } from "@/interfaces/Trailer";
import { FetchResponse } from "@/interfaces/FetchResponse";

const useTrailers = (movieId: number) => {
  const { data, error, isLoading } = useQuery<FetchResponse<Trailer>, Error>({
    queryKey: ["trailer", movieId],
    queryFn: async () =>
      axiosInstance
        .get<FetchResponse<Trailer>>(`/movie/${movieId}/videos`)
        .then((res) => res.data),
  });
  const trailers = data?.results;
  return { trailers, error, isLoading };
};
export default useTrailers;
