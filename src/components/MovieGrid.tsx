import useMovies from "@/hooks/useMovies";
import {
  Card,
  Container,
  Image,
  SimpleGrid
} from "@chakra-ui/react";


const MovieGrid = () => {
  const { movies, isLoading, error } = useMovies();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  return (
    <Container maxW="7xl">
      <SimpleGrid columns={5} gap={4}>
        {movies.map((movie) => {
          return (
            <Card.Root maxW="fit-content">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
                width={200}
                height={300}
              />
              <p>{movie.original_title}</p>
            </Card.Root>
          );
        })}
        {/* {movies.map((movie) => {
        return (
          <div key={movie.id}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
              width={200}
              height={300}
            />
            {movie.original_title}
          </div>
        );
      })} */}
      </SimpleGrid>
    </Container>
  );
};

export default MovieGrid;
