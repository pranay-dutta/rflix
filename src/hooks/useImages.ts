import axiosInstance from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

interface Logo {
  iso_639_1: string;
  file_path: string;
}
interface Images {
  id: number;
  logos: Logo[];
}

const useImages = (movieId: number) => {
  const {
    data: images,
    error,
    isLoading,
  } = useQuery<Images, Error>({
    queryKey: ["images", movieId],
    queryFn: async () => {
      return axiosInstance
        .get<Images>(`/movie/${movieId}/images`)
        .then((res) => res.data);
    },
  });
  return { images, error, isLoading };
};

export default useImages;
