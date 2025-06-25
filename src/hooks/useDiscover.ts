import { Movie } from "@/interfaces/Movie";
import {
  useSelectedMovieGenreStore,
  useSelectedTvGenreStore,
} from "@/store/selectedGenresStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import { useSearchParams } from "react-router-dom";
import TvSeries from "@/interfaces/TvSeries";
import createClient from "@/services/client";

type DiscoverType = {
  movie: Movie;
  tv: TvSeries;
};

const useDiscover = <T extends keyof DiscoverType>(endpoint: T) => {
  type MediaType = DiscoverType[T];

  const client = createClient<MediaType>("/discover/" + endpoint);
  const genres = useGenres(endpoint);

  const [searchParams] = useSearchParams();
  const sort_by = searchParams.get("sort_by");

  const res = useInfiniteQuery({
    queryKey: ["discover", endpoint, genres, sort_by],
    initialPageParam: 1,
    staleTime: ms("2h"),
    queryFn: ({ pageParam }) =>
      client.getAll({ params: { page: pageParam, with_genres: genres, sort_by } }),

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
