import axiosInstance from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { Images } from "../interfaces/Images";

const useLogoImages = (movieId: number) => {
  const {
    data: logoImages,
    error,
    isLoading,
  } = useQuery<Images, Error>({
    queryKey: ["logoImages", movieId],
    queryFn: async () => {
      return axiosInstance
        .get<Images>(`/movie/${movieId}/images`)
        .then((res) => res.data);
    },
  });
  return { logoImages, error, isLoading };
};

export default useLogoImages;
