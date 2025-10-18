import { useQuery } from "@tanstack/react-query";
import createClient from "@/services/client";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import ms from "ms";

const useSearchSuggestion = (query: string) => {
  const movieClient = createClient<Movie>("/search/movie");
  const tvClient = createClient<TvSeries>("/search/tv");

  const movieResponse = useQuery({
    queryKey: ["search-suggestion-movies", query],
    queryFn: () => movieClient.getAll({ params: { query } }),
    staleTime: ms("1h"),
    enabled: query.length > 2, // Only run if query exists and is longer than 2 chars
  });

  const tvResponse = useQuery({
    queryKey: ["search-suggestion-tv", query],
    queryFn: () => tvClient.getAll({ params: { query } }),
    staleTime: ms("1h"),
    enabled: query.length > 2, // Only run if query exists and is longer than 2 chars
  });

  const isLoading = movieResponse.isLoading || tvResponse.isLoading;
  return {
    movieResponse: movieResponse.data,
    tvResponse: tvResponse.data,
    isLoading,
    error: movieResponse.error || tvResponse.error,
  };
};

export default useSearchSuggestion;
