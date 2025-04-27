import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import useMovieLists from "@/hooks/useMovieLists";
import useTrendingMovies from "@/hooks/useTrendingMovies";
import useTvSeriesLists from "@/hooks/useTvSeriesLists";
import { Box } from "@chakra-ui/react";
import { MediaScroll, MediaScrollHeading } from "@/components/common";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import isMovie from "@/utils/isMovie";

interface Reel {
  media: Movie[] | TvSeries[] | undefined;
  heading: string;
}
const HomePage = () => {
  const { data: topMovies } = useMovieLists("top_rated");
  const { data: trendingMovies } = useTrendingMovies("movie", "day");
  const { data: popularSeries } = useTvSeriesLists("popular");
  const { data: topSeries } = useTvSeriesLists("top_rated");

  const Reels: Reel[] = [
    { media: topMovies?.pages[0].results, heading: "Top Movies" },
    { media: trendingMovies?.results, heading: "Trending Movies" },
    { media: popularSeries?.pages[0].results, heading: "Popular Tv Series" },
    { media: topSeries?.pages[0].results, heading: "Top Tv Series" },
  ];

  return (
    <Box>
      <Navbar />
      <Hero />
      <Box className="w-full md:-mt-40! !px-10 z-10 relative">
        {Reels.map(
          ({ media, heading }) =>
            media && (
              <Box key={heading} my={5}>
                <MediaScrollHeading highlight={isMovie(media) ? "Movies" : "Tv Series"}>
                  {heading}
                </MediaScrollHeading>
                <MediaScroll media={media} />
              </Box>
            ),
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
