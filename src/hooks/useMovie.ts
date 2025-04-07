import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/api-client";

interface MovieDetails {
  adult: boolean;
  backdrop_path: string; // i don't know
  // genres: [
  //   {
  //     id: number;
  //     name: string;
  //   }
  // ];
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string; //url
  // production_companies: [
  //   {
  //     id: 25;
  //     logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png";
  //     name: "20th Century Fox";
  //     origin_country: "US";
  //   }
  // ];
  release_date: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
}
const useMovie = (movieId: number) => {
  const {
    data: movie,
    error,
    isLoading,
  } = useQuery<MovieDetails, Error>({
    queryKey: ["movie", movieId],
    queryFn: async () => {
      return axiosInstance
        .get<MovieDetails>("/movie/" + movieId)
        .then((res) => res.data);
    },
  });
  return { movie, error, isLoading };
};
export default useMovie;
