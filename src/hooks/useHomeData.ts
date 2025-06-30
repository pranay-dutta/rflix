import { useMemo } from "react";
import useTrending from "./useTrending";
import useMovieLists from "./useMovieLists";
import useTvSeriesLists from "./useTvSeriesLists";

export const useHomeData = () => {
  const trendingMoviesDay = useTrending("movie", "day");
  const trendingMoviesWeek = useTrending("movie", "week");
  const nowPlayingMovies = useMovieLists("now_playing");
  const popularMovies = useMovieLists("popular");
  const topMovies = useMovieLists("top_rated");

  const trendingShowsDay = useTrending("tv", "day");
  const trendingShowsWeek = useTrending("tv", "week");
  const onTheAirTvShows = useTvSeriesLists("on_the_air");
  const showsAiringToday = useTvSeriesLists("airing_today");
  const popularShows = useTvSeriesLists("popular");
  const topShows = useTvSeriesLists("top_rated");

  const isLoading =
    trendingMoviesDay.isLoading ||
    trendingMoviesWeek.isLoading ||
    nowPlayingMovies.isLoading ||
    popularMovies.isLoading ||
    topMovies.isLoading ||
    trendingShowsDay.isLoading ||
    trendingShowsWeek.isLoading ||
    onTheAirTvShows.isLoading ||
    showsAiringToday.isLoading ||
    popularShows.isLoading ||
    topShows.isLoading;

  const reels = useMemo(
    () => [
      { id: 0, heading: "Trending Movies Today", media: trendingMoviesDay.data?.results },
      { id: 1, heading: "Popular Movies", media: popularMovies.data?.pages[0].results },
      { id: 2, heading: "Trending Movies This Week", media: trendingMoviesWeek.data?.results },
      { id: 3, heading: "Top Rated Movies", media: topMovies.data?.pages[0].results },
      { id: 4, heading: "Now Playing Movies", media: nowPlayingMovies.data?.pages[0].results },
      { id: 5, heading: "Trending TV Shows Today", media: trendingShowsDay.data?.results },
      { id: 6, heading: "Top TV Shows", media: topShows.data?.pages[0].results },
      { id: 7, heading: "Trending TV Shows This Week", media: trendingShowsWeek.data?.results },
      { id: 8, heading: "Popular TV Shows", media: popularShows.data?.pages[0].results },
      { id: 9, heading: "On The Air TV Shows", media: onTheAirTvShows.data?.pages[0].results },
      {
        id: 10,
        heading: "TV Shows Airing Today",
        media: showsAiringToday.data?.pages[0].results,
      },
    ],
    [
      trendingMoviesDay.data,
      popularMovies.data,
      trendingMoviesWeek.data,
      topMovies.data,
      nowPlayingMovies.data,
      trendingShowsDay.data,
      topShows.data,
      trendingShowsWeek.data,
      popularShows.data,
      onTheAirTvShows.data,
      showsAiringToday.data,
    ],
  );

  return { reels, isLoading };
};
