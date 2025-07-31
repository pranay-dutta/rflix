import { MovieDetails } from "@/interfaces/MovieDetails";
import { TvSeriesDetails } from "@/interfaces/TvSeriesDetails";
import createClient from "@/services/client";
import { useGeneratedMedia } from "@/store/generatedMediaStore";
import { useQuery } from "@tanstack/react-query";

type Media = {
  movie: MovieDetails;
  tv: TvSeriesDetails;
};
const useMedia = () => {
  const { type, id } = useGeneratedMedia((s) => s.generatedMedia);

  const getClient = <T extends keyof Media>(type: T, id: number) => {
    return createClient<Media[T]>(`/${type}/${id}`);
  };
  const client = getClient(type, id);

  return useQuery({
    queryKey: [type, id],
    retry: false,
    enabled: id !== 1,
    queryFn: () => client.get(),
  });
};

export default useMedia;
