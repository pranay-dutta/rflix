import { getTMDBImage } from "@/components/constants";
import useMovie from "@/hooks/useMovie";
import { BiPlay } from "react-icons/bi";
import {
  Badge,
  Box,
  GridItem,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ReleaseDate from "@/components/ReleaseDate";
import Rating from "@/components/Rating";
import useSimilarMovies from "@/hooks/useSimilarMovies";
import Gradient from "@/components/Gradient";
import { Quote } from "../components/Quote";
import Runtime from "@/components/Runtime";
import BackButton from "@/components/BackButton";
import MovieWatchButton from "@/components/WatchButton";
import { MediaScroll, MediaScrollHeading } from "@/components/common";
import { Movie } from "@/interfaces/Movie";

const MovieInfoPage = () => {
  const { id } = useParams();
  if (!id) throw new Error("Info page");

  const { similarMovies } = useSimilarMovies(1, parseInt(id));
  const { movie } = useMovie(parseInt(id));

  if (!movie || !similarMovies) return null;

  return (
    <>
      <Box my={3}>
        <BackButton />
      </Box>
      <Box position="relative" height="fit-content">
        <MediaPoster media={movie} />
        <Box display={{ base: "none", md: "block" }}>
          <Gradient.Bottom />
        </Box>

        <SimpleGrid
          className="md:absolute left-[2%] md:top-2 md:bottom-auto lg:top-auto lg:bottom-[3%]"
          columns={{ base: 1, md: 4 }}
          gap={{ sm: 2, lg: 5 }}
        >
          {/* Card image above poster */}
          <GridItem>
            <Image
              src={getTMDBImage(movie.poster_path, "original", "vertical")}
              borderRadius="md"
            />
          </GridItem>
          <GridItem colSpan={{ md: 3 }} px={2}>
            <Box display="flex" flexDirection="column" gap={5}>
              <Stack gap={4}>
                <Heading fontSize="4xl">{movie.title}</Heading>
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
                <Rating rating={movie.vote_average} />
              </HStack>
              <Text lineClamp={2} fontSize={{ sm: "sm", md: "normal" }}>
                {movie.overview}
              </Text>
              <MovieWatchButton id={movie.id} icon={BiPlay}>
                Watch Now
              </MovieWatchButton>
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
                        <Text key={company.id} fontSize="sm" fontStyle="italic" color="gray.300">
                          {company.name}
                          {index + 1 != movie.production_companies.length && <span>{" •"}</span>}
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

      {/* Similar movies scroll compoent */}
      <SimilarMovies movies={similarMovies} />
    </>
  );
};

const SimilarMovies = ({ movies }: { movies: Movie[] }) => {
  if (!movies.length) return null;
  return (
    <Box mt={10}>
      <MediaScrollHeading highlight="Movies">Similar Movies</MediaScrollHeading>
      <MediaScroll media={movies} />
    </Box>
  );
};

export default MovieInfoPage;

const MediaPoster = ({ media }: { media: Movie }) => {
  if (!media) return null;
  return (
    <Box className="opacity-50 hidden! md:block! rounded-lg">
      <Image
        className="opacity-70 w-full rounded-md object-cover"
        src={getTMDBImage(media.backdrop_path, "original", "horizontal")}
        alt={media.original_title}
      />
    </Box>
  );
};
