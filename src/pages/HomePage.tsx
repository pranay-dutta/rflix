import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MovieScroll from "@/components/MovieScroll";
import Navbar from "@/components/Navbar";
import useMovieLists from "@/hooks/useMovieLists";
import useTrendingMovies from "@/hooks/useTrendingMovies";
import useTvSeriesLists from "@/hooks/useTvSeriesLists";
import { Box, Heading, Highlight } from "@chakra-ui/react";

const HomePage = () => {
  const { data: topMovies } = useMovieLists("top_rated");
  const { movies: trendingMovies } = useTrendingMovies("week");
  const { data: popularSeries } = useTvSeriesLists("popular");
  const { data: topSeries } = useTvSeriesLists("top_rated");

  if (!topMovies || !trendingMovies) return null;

  return (
    <Box>
      <Navbar />
      <Hero />
      <Box className="w-full md:-mt-40! !px-10 z-10 relative">
        <div>
          <Heading fontSize="2xl" fontWeight="bold" filter={"contrast(2)"}>
            <Highlight query={"Movies"} styles={{ color: "red.600" }}>
              Trending Movies
            </Highlight>
          </Heading>
          <MovieScroll media={trendingMovies} />
        </div>
        <div className="mt-10!">
          <Heading fontSize="2xl" fontWeight="bold" filter={"contrast(2)"}>
            <Highlight query={"Movies"} styles={{ color: "red.600" }}>
              Top Rated Movies
            </Highlight>
          </Heading>
          <MovieScroll media={topMovies.pages[0].results || []} />
        </div>
        <div>
          <Heading fontSize="2xl" fontWeight="bold" filter={"contrast(2)"}>
            <Highlight query={"Tv Series"} styles={{ color: "red.600" }}>
              Top Tv Series
            </Highlight>
          </Heading>
          <MovieScroll media={topSeries?.pages[0].results || []} />
        </div>
        <div>
          <Heading fontSize="2xl" fontWeight="bold" filter={"contrast(2)"}>
            <Highlight query={"Tv Series"} styles={{ color: "red.600" }}>
              Popular Tv Series
            </Highlight>
          </Heading>
          <MovieScroll media={popularSeries?.pages[0].results || []} />
        </div>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
