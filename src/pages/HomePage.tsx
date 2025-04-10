import Hero from "@/components/Hero";
import MovieScroll from "@/components/MovieScroll";
import useMovies from "@/hooks/useMovies";
import useTrendingMovies from "@/hooks/useTrendingMovies";
import { Box } from "@chakra-ui/react";

const HomePage = () => {
  const { movies: upcomingMovies } = useMovies(1, "top_rated");
  const { movies: trendingMovies } = useTrendingMovies("week");
  if (!upcomingMovies || !trendingMovies) return null;

  return (
    <div>
      <Box className="relative">
        <Hero />
        <Box className="absolute w-full top-[90%] !px-10">
          <MovieScroll movies={upcomingMovies} />
          <MovieScroll movies={trendingMovies} />
          {/* <MovieScroll endpoint="top_rated" />
          <MovieScroll endpoint="upcoming" /> */}
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
