import useMovies from "@/hooks/useMovies";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import MovieCard from "./OldMovieCard";
import Pagination from "./Pagination";

const MovieGrid = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { movies, isLoading, error } = useMovies(currentPage, "popular");

  if (isLoading) return <div>Loading...</div>;
  if (error || !movies) return <div>Something went wrong</div>;

  return (
    <>
      <Container maxW="7xl" py={10}>
        <SimpleGrid
          justifyItems="center"
          gap={4}
          columns={{
            base: 1,
            md: 3,
            lg: 4,
            xl: 5,
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie}></MovieCard>
          ))}
        </SimpleGrid>
        <Box mt={16}>
          <Pagination
            changePage={(pageNo) => setCurrentPage(pageNo)}
            currentPage={currentPage}
          />
        </Box>
      </Container>
    </>
  );
};

export default MovieGrid;
