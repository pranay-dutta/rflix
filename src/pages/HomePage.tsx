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
      <Box className="w-full md:-mt-32! sm:!px-10 !px-2 z-10 relative">
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
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
