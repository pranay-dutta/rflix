import { MovieDetails } from "@/interfaces/MovieDetails";
import { TvSeriesDetails } from "@/interfaces/TvSeriesDetails";
import ApiClient from "@/services/api-client";
import { useGeneratedMedia } from "@/store/generatedMediaStore";
import { useQuery } from "@tanstack/react-query";

type Media = {
  movie: MovieDetails;
  tv: TvSeriesDetails;
};
const useMedia = () => {
  const { type, id } = useGeneratedMedia((s) => s.generatedMedia);

  const getApiClient = <T extends keyof Media>(type: T, id: number) => {
    return new ApiClient<Media[T]>(`/${type}/${id}`);
  };
  const apiClient = getApiClient(type, id);

  return useQuery({
    queryKey: [type, id],
    retry: 1,
    enabled: id !== 1,
    queryFn: () => apiClient.get(),
  });
};

export default useMedia;
