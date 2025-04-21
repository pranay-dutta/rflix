import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { Images } from "../interfaces/Images";

const useLogoImages = (movieId: number) => {
  const apiClient = new ApiClient<Images>(`/movie/${movieId}/images`);
  const { data, error, isLoading } = useQuery<Images, Error>({
    queryKey: ["logoImages", movieId],
    queryFn: apiClient.get,
  });
  return { logoImages: data, error, isLoading };
};

export default useLogoImages;
