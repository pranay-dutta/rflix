import { MovieDetails } from "@/interfaces/MovieDetails";
import { TvSeriesDetails } from "@/interfaces/TvSeriesDetails";
import BackendClient from "@/services/backend-client";
import { useGeneratedMedia } from "@/store/generatedMediaStore";
import { useQuery } from "@tanstack/react-query";

type Media = {
  movie: MovieDetails;
  tv: TvSeriesDetails;
};
const useMedia = () => {
  const { type, id } = useGeneratedMedia((s) => s.generatedMedia);

  const getClient = <T extends keyof Media>(type: T, id: number) => {
    return new BackendClient<Media[T]>(`/${type}/${id}`);
  };
  const backendClient = getClient(type, id);

  return useQuery({
    queryKey: [type, id],
    retry: 1,
    enabled: id !== 1,
    queryFn: () => backendClient.get(),
  });
};

export default useMedia;
