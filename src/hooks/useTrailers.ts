import axiosInstance from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

interface Trailer {
  id: number;
  key: string;
  type: string;
}
interface FetchResponse {
  results: Trailer[];
}

const useTrailers = (movieId: number) => {
  const { data, error, isLoading } = useQuery<FetchResponse, Error>({
    queryKey: ["trailer", movieId],
    queryFn: async () =>
      axiosInstance
        .get<FetchResponse>(`/movie/${movieId}/videos`)
        .then((res) => res.data),
  });
  const trailers = data?.results;
  return { trailers, error, isLoading };
};
export default useTrailers;
