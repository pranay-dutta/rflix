import BackButton from "@/components/BackButton";
import MovieWatchButton from "@/components/MovieWatchButton";
import Rating from "@/components/Rating";
import ReleaseDate from "@/components/ReleaseDate";
import Runtime from "@/components/Runtime";
import WatchListButton from "@/components/WatchListButton";
import {
  MediaPoster,
  MediaScrollHeading,
  VerticalMediaScroll,
} from "@/components/common";
import Credits from "@/components/common/Credits";
import { getTMDBImage } from "@/components/constants";
import RectMediaScroll from "@/components/scroll/RectMediaScroll";
import Skeleton from "@/components/skeleton/Skeleton";
import useMovie from "@/hooks/useMovie";
import useRectPoster from "@/hooks/useRectPoster";
import useSimilarMovies from "@/hooks/useSimilarMovies";
import { MovieDetails } from "@/interfaces/MovieDetails";
import useCustomizationStore from "@/store/customizationStore";
import getPosterURL from "@/utils/getPosterURL";
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
  useMediaQuery,
} from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import { Quote } from "../components/Quote";

const MovieInfoPage = () => {
  const { id } = useParams();
  if (!id) throw new Error("Info page");

  const { movie, isLoading } = useMovie(parseInt(id));

  return (
    <>
      <Box mt={5} mb={5}>
        <BackButton />
      </Box>
      {isLoading ? <Skeleton w="full" h="80vh" /> : movie && <MovieHero movie={movie} />}
    </>
  );
};

const SimilarMovies = () => {
  const { id } = useParams();
  const cardStyle = useCustomizationStore((s) => s.cardStyle);
  if (!id) throw new Error("Info page");

  const { similarMovies, isLoading } = useSimilarMovies(1, parseInt(id));
  const [isLargerThan480] = useMediaQuery(["(min-width: 480px)"]);
  if ((!isLoading && !similarMovies) || !similarMovies?.length) return null;

  return (
    <Box mt={10}>
      <Box my={3}>
        <MediaScrollHeading highlight="Movies">Similar Movies</MediaScrollHeading>
      </Box>
      similarMovies
      {cardStyle === "horizontal" && isLargerThan480 ? (
        <RectMediaScroll media={similarMovies} loading={isLoading} />
      ) : (
        <VerticalMediaScroll media={similarMovies} loading={isLoading} />
      )}
    </Box>
  );
};

export default MovieInfoPage;

const MovieHero = ({ movie }: { movie: MovieDetails }) => {
  const { inView, ref } = useInView({ triggerOnce: true });
  const { data: rectPoster, isLoading } = useRectPoster(movie.id, "movie");
  const posterPath = getPosterURL(isLoading, rectPoster);

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
              src={getTMDBImage(movie.poster_path, "w500", "vertical")}
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

                {!isLoading && posterPath && (
                  <WatchListButton
                    id={movie.id.toString()}
                    mediaType="movie"
                    posterPath={movie.poster_path}
                    rectPosterPath={posterPath}
                    title={movie.title}
                    rating={movie.vote_average}
                    releaseDate={movie.release_date}
                  />
                )}
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

      {/* Movie credits component */}
      <Box my={5}>
        <MediaScrollHeading highlight="Cast">Top Billed Cast</MediaScrollHeading>
        <Box mt={2}>
          <Credits isTvShow={false} mediaId={movie.id.toString()} />
        </Box>
      </Box>

      {/* Similar movies scroll component */}
      <div ref={ref}>{inView && <SimilarMovies />}</div>
    </>
  );
};
