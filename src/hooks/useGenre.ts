import { Movie } from "@/interfaces/Movie";
import createClient from "@/services/client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

const useGenre = (selectedGenre: string) => {
  const client = createClient<Movie>("/discover/movie");

  return useQuery({
    queryKey: ["genre", selectedGenre],
    queryFn: () => client.getAll({ params: { with_genres: selectedGenre } }),
    staleTime: ms("2h"),
  });
};

export default useGenre;
