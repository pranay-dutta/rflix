import useMovies from "@/hooks/useMovies";
import { Container, SimpleGrid } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import { useState } from "react";

const MovieGrid = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading, error } = useMovies(currentPage);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <>
      <Container maxW="7xl">
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
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie}></MovieCard>
          ))}
        </SimpleGrid>
        <Pagination
          changePage={(pageNo) => setCurrentPage(pageNo)}
          currentPage={currentPage}
        />
      </Container>
    </>
  );
};

export default MovieGrid;
