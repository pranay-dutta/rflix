import { Movie } from "@/interfaces/Movie";
import ApiClient from "@/services/api-client";
import {
  useSelectedMovieGenreStore,
  useSelectedTvGenreStore,
} from "@/store/selectedGenresStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";

const useDiscover = (endpoint: "movie" | "tv") => {
  const apiClient = new ApiClient<Movie>("/discover/" + endpoint);
  const genres = useGenres(endpoint);

  const res = useInfiniteQuery({
    queryKey: ["discover", endpoint, genres],
    initialPageParam: 1,
    staleTime: ms("2h"),
    queryFn: ({ pageParam }) =>
      apiClient.getAll({ params: { page: pageParam, with_genres: genres } }),

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.results.length ? allPages.length + 1 : undefined;
    },
  });

  const resCount =
    res.data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;
  return { ...res, resCount };
};

//Get a Set<number> return a string of selected genres
const useGenres = (endpoint: "movie" | "tv") => {
  const movieGenresSet = useSelectedMovieGenreStore((s) => s.movieGenresSet);
  const tvGenresSet = useSelectedTvGenreStore((s) => s.tvGenresSet);

  let genres = "";
  if (endpoint === "movie") {
    genres += [...movieGenresSet.values()].map((genre) => genre.toString());
  } else {
    genres += [...tvGenresSet.values()].map((genre) => genre.toString());
  }
  return genres;
};

export default useDiscover;
