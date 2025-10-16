import { getTMDBImage } from "@/components/constants";
import useMovie from "@/hooks/useMovie";
import { FaPlay } from "react-icons/fa";
import {
  Badge,
  Box,
  GridItem,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ReleaseDate from "@/components/ReleaseDate";
import Rating from "@/components/Rating";
import useSimilarMovies from "@/hooks/useSimilarMovies";
import { Quote } from "../components/Quote";
import Runtime from "@/components/Runtime";
import BackButton from "@/components/BackButton";
import MovieWatchButton from "@/components/MovieWatchButton";
import { MediaScroll, MediaScrollHeading, MediaPoster } from "@/components/common";
import { MovieDetails } from "@/interfaces/MovieDetails";
import { useInView } from "react-intersection-observer";
import WatchListButton from "@/components/WatchListButton";
import MovieCredits from "@/components/movie/MovieCredits";

const MovieInfoPage = () => {
  const { id } = useParams();
  if (!id) throw new Error("Info page");

  const { movie, isLoading } = useMovie(parseInt(id));

  return (
    <>
      <Box my={3}>
        <BackButton />
      </Box>
      {isLoading ? <Skeleton w="full" h="80vh" /> : <MovieHero movie={movie} />}
    </>
  );
};

const SimilarMovies = () => {
  const { id } = useParams();
  if (!id) throw new Error("Info page");

  const { similarMovies } = useSimilarMovies(1, parseInt(id));
  if (!similarMovies || !similarMovies.length) return null;

  return (
    <Box mt={10}>
      <MediaScrollHeading highlight="Movies">Similar Movies</MediaScrollHeading>
      <MediaScroll similarMedia media={similarMovies} />
    </Box>
  );
};

export default MovieInfoPage;

const MovieHero = ({ movie }: { movie: MovieDetails | undefined }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
  });
  if (!movie) return null;

  return (
    <>
      <Box position="relative" height="fit-content">
        <MediaPoster backdrop_path={movie.backdrop_path} />

        <SimpleGrid
          className="md:absolute left-[2%] md:bottom-[10%] lg:top-auto lg:bottom-[3%]"
          alignItems="center"
          columns={{ base: 1, md: 4 }}
          gap={{ sm: 2, lg: 5 }}
        >
          {/* Card image over poster */}
          <GridItem>
            <Image
              src={getTMDBImage(movie.poster_path, "original", "vertical")}
              borderRadius="md"
              objectFit="cover"
              className="lg:w-80"
              aspectRatio={2 / 3}
              loading="lazy"
            />
          </GridItem>
          <GridItem colSpan={{ md: 3 }} px={2}>
            <Box display="flex" flexDirection="column" gap={5}>
              <Stack gap={4}>
                <Heading mt={{ base: 2, md: 0 }} lineHeight="1" fontSize="4xl">
                  {movie.title}
                </Heading>
                <Quote tagline={movie.tagline} />
              </Stack>
              <HStack flexWrap="wrap">
                {movie.genres.map((genre) => (
                  <Badge size="md" key={genre.id}>
                    {genre.name}
                  </Badge>
                ))}
              </HStack>
              <HStack>
                <ReleaseDate date={movie.release_date} />
                <Runtime runtime={movie.runtime} />
                <Rating vote_average={movie.vote_average} />
              </HStack>
              <Text lineClamp={2} fontSize={{ sm: "sm", md: "normal" }}>
                {movie.overview}
              </Text>
              <HStack gap={4}>
                <MovieWatchButton id={movie.id} icon={FaPlay}>
                  Watch Trailer
                </MovieWatchButton>
                <WatchListButton
                  id={movie.id}
                  type="movie"
                  posterPath={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                />
              </HStack>
            </Box>

            <Stack mt={5}>
              <HStack
                flexDirection={{ base: "column", md: "row" }}
                alignItems={{ base: "flex-start", md: "center" }}
                maxW={{ md: "3/4" }}
                justify="space-between"
              >
                <Box>
                  <Text fontWeight="medium">Production</Text>
                  <HStack>
                    {movie.production_companies.map((company, index) =>
                      index <= 2 ? (
                        <Text
                          key={company.id}
                          fontSize="sm"
                          fontStyle="italic"
                          color="gray.300"
                        >
                          {company.name}
                          {index + 1 != movie.production_companies.length && (
                            <span>{" •"}</span>
                          )}
                        </Text>
                      ) : null,
                    )}
                  </HStack>
                </Box>

                <Box>
                  <Text fontWeight="medium">Language</Text>
                  <Text fontSize="sm" fontStyle="italic" color="gray.300">
                    {movie.original_language.toUpperCase()}
                  </Text>
                </Box>
              </HStack>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Box>

      <MovieCredits id={movie.id.toString()} />

      {/* Similar movies scroll component */}
      <div ref={ref}>{inView && <SimilarMovies />}</div>
    </>
  );
};
