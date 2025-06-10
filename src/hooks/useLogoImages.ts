import { useQuery } from "@tanstack/react-query";
import { Images } from "../interfaces/Images";
import ms from "ms";
import BackendClient from "@/services/backend-client";

const useLogoImages = (movieId: number) => {
  const backendClient = new BackendClient<Images>(`/movie/images/${movieId}`);

  const { data, error, isLoading } = useQuery<Images, Error>({
    staleTime: ms("1d"),
    queryKey: ["logoImages", movieId],
    queryFn: backendClient.get,
  });
  return { logoImages: data, error, isLoading };
};

export default useLogoImages;
