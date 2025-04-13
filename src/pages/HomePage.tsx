import Hero from "@/components/Hero";
import MovieScroll from "@/components/MovieScroll";
import useMovies from "@/hooks/useMovies";
import useTrendingMovies from "@/hooks/useTrendingMovies";
import { Box, Heading, Highlight } from "@chakra-ui/react";

const HomePage = () => {
  const { movies: topMovies } = useMovies(1, "top_rated");
  const { movies: trendingMovies } = useTrendingMovies("week");
  if (!topMovies || !trendingMovies) return null;

  return (
    <div>
      <Box className="relative">
        <Hero />
        <Box className="absolute w-full top-[105%] md:top-[90%] !px-10 z-10">
          <div>
            <Heading fontSize="2xl" fontWeight="bold" filter={"contrast(2)"}>
              <Highlight query={"Movies"} styles={{ color: "red.600" }}>
                Trending Movies
              </Highlight>
            </Heading>
            <MovieScroll movies={trendingMovies} />
          </div>
          <div className="mt-10!">
            <Heading fontSize="2xl" fontWeight="bold" filter={"contrast(2)"}>
              <Highlight query={"Movies"} styles={{ color: "red.600" }}>
                Top Rated Movies
              </Highlight>
            </Heading>
            <MovieScroll movies={topMovies} />
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
