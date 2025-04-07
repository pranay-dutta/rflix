import axiosInstance from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

interface Video {
  id: number;
  key: string;
  type: string;
}
interface FetchResponse {
  results: Video[];
}

const useVideos = (movieId: number) => {
  const { data, error, isLoading } = useQuery<FetchResponse, Error>({
    queryKey: ["videos", movieId],
    queryFn: async () =>
      axiosInstance
        .get<FetchResponse>(`/movie/${movieId}/videos`)
        .then((res) => res.data),
  });
  const videos = data?.results;
  return { videos, error, isLoading };
};
export default useVideos;
