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

interface Reel {
  media: Movie[] | TvSeries[] | undefined;
  heading: string;
}
const HomePage = () => {
  const { data: topMovies } = useMovieLists("top_rated");
  const { data: trendingMovies } = useTrending("movie", "day");
  const { data: trendingShows } = useTrending("tv", "day");
  const { data: popularShows } = useTvSeriesLists("popular");
  const { data: topShows } = useTvSeriesLists("top_rated");

  const Reels: Reel[] = [
    { media: trendingMovies?.results, heading: "Trending Movies" },
    { media: topMovies?.pages[0].results, heading: "Top Movies" },
    { media: trendingShows?.results, heading: "Trending TV Shows" },
    { media: popularShows?.pages[0].results, heading: "Popular TV Shows" },
    { media: topShows?.pages[0].results, heading: "Top TV Shows" },
  ];

  return (
    <Box>
      <Navbar />
      <Hero />

      <Box className="w-full md:-mt-36! sm:!px-10 !px-2 z-10 relative">
        {Reels.map(
          ({ media, heading }) =>
            media && (
              <Box key={heading} my={5}
              borderWidth="1px" borderColor="border.subtle"
               bg="gray.950" p={{ lg: 10, base: 5 }} borderRadius="10px">
                <MediaScrollHeading highlight={isMovie(media) ? "Movies" : "TV Shows"}>
                  {heading}
                </MediaScrollHeading>
                <MediaScroll media={media} />
              </Box>
            )
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
