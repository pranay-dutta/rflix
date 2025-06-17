import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import useMovieLists from "@/hooks/useMovieLists";
import useTvSeriesLists from "@/hooks/useTvSeriesLists";
import { Box } from "@chakra-ui/react";
import { MediaScroll, MediaScrollHeading } from "@/components/common";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import isMovie from "@/utils/isMovie";
import useTrending from "@/hooks/useTrending";
import AiRecommended from "@/components/AiRecommended";
import { Fragment } from "react/jsx-runtime";
interface Reel {
  media: Movie[] | TvSeries[] | undefined;
  heading: string;
}

const HomePage = () => {
  const {
    isLoading, trendingMoviesDay, popularMovies, trendingMoviesWeek, topMovies, nowPlayingMovies,
    trendingShowsDay, topShows, trendingShowsWeek, popularShows, onTheAirTvShows, showsAiringToday
  } = useMedias();

  const Reels: Reel[] = [
    { media: trendingMoviesDay?.results, heading: "Trending Movies Today" },
    { media: popularMovies?.pages[0].results, heading: "Popular Movies" },
    { media: trendingMoviesWeek?.results, heading: "Trending Movies This Week" },
    { media: topMovies?.pages[0].results, heading: "Top Rated Movies" },
    { media: nowPlayingMovies?.pages[0].results, heading: "Now Playing Movies" },


    { media: trendingShowsDay?.results, heading: "Trending TV Shows Today" },
    { media: topShows?.pages[0].results, heading: "Top TV Shows" },
    { media: trendingShowsWeek?.results, heading: "Trending TV Shows This Week" },
    { media: popularShows?.pages[0].results, heading: "Popular TV Shows" },
    { media: onTheAirTvShows?.pages[0].results, heading: "On The Air TV Shows" },
    { media: showsAiringToday?.pages[0].results, heading: "TV Shows Airing Today" },
  ];

  return (
    <Box>
      <Navbar />
      <Hero />
      {!isLoading && <Box className="w-full md:-mt-32! sm:!px-10 !px-2 z-10 relative">
        {Reels.map(({ media, heading }, index) => media && (
          <Fragment key={heading}>
            {index === 1 && <AiRecommended />}
            <Box my={5}
              borderWidth="1px" borderColor="border.subtle"
              bg="gray.950" px={{ lg: 10, base: 5 }} py={{ lg: 8, base: 3 }} borderRadius="10px">
              <Box mb={3}>
                <MediaScrollHeading highlight={isMovie(media) ? "Movies" : "TV Shows"}>
                  {heading}
                </MediaScrollHeading>
              </Box>
              <MediaScroll media={media} />
            </Box>
          </Fragment>
        ))}
      </Box>}
      <Footer />
    </Box>
  );
};

export default HomePage;
const useMedias = () => {
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

  return {
    isLoading,
    trendingMoviesDay: trendingMoviesDay.data,
    trendingMoviesWeek: trendingMoviesWeek.data,
    nowPlayingMovies: nowPlayingMovies.data,
    popularMovies: popularMovies.data,
    topMovies: topMovies.data,
    trendingShowsDay: trendingShowsDay.data,
    trendingShowsWeek: trendingShowsWeek.data,
    onTheAirTvShows: onTheAirTvShows.data,
    showsAiringToday: showsAiringToday.data,
    popularShows: popularShows.data,
    topShows: topShows.data,
  };
};
