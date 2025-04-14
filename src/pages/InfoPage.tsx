import Button from "@/components/Button";
import { getTMDBImage } from "@/components/constants";
import useMovie from "@/hooks/useMovie";
import { BiPlay } from "react-icons/bi";
import {
  Highlight,
  Badge,
  Blockquote,
  Box,
  Container,
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
import MovieScroll from "@/components/MovieScroll";
import useSimilarMovies from "@/hooks/useSimilarMovies";

const InfoPage = () => {
  const { id } = useParams();
  if (!id) throw new Error("Info page");

  const { similarMovies } = useSimilarMovies(1, parseInt(id));
  const { movie } = useMovie(parseInt(id));
  if (!movie || !similarMovies) return null;

  return (
    <Container>
      <Box position="relative">
        <Image
          className="opacity-50 hidden! md:block! rounded-md"
          src={getTMDBImage(movie.backdrop_path, "original")}
        />
        <div className="hidden! md:absolute! inset-0 pointer-events-none">
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />

          {/* Left & Right gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
        </div>
        <SimpleGrid
          className="md:absolute left-[2%] bottom-[3%]"
          columns={{ base: 1, md: 4 }}
          gap={5}
        >
          <GridItem>
            <Image
              src={getTMDBImage(movie.poster_path, "original")}
              borderRadius="md"
            />
          </GridItem>
          <GridItem colSpan={{ md: 3 }} px={2}>
            <Box display="flex" flexDirection="column" gap={5}>
              <Stack gap={4}>
                <Heading fontSize="4xl">{movie.title}</Heading>
                <Quote content={movie.tagline} />
              </Stack>
              <HStack>
                {movie.genres.map((genre) => (
                  <Badge size="md" key={genre.id}>
                    {genre.name}
                  </Badge>
                ))}
              </HStack>
              <HStack>
                <ReleaseDate date={movie.release_date} />
                <Text>{movie.runtime} min</Text>
                <Rating rating={movie.vote_average} />
              </HStack>
              <Text>{movie.overview}</Text>
              <Button icon={BiPlay}>Watch Now</Button>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>

      <div>
        <Heading fontSize="2xl" fontWeight="bold" filter={"contrast(2)"}>
          <Highlight query={"Movies"} styles={{ color: "red.600" }}>
            Similar Movies
          </Highlight>
        </Heading>
        <MovieScroll movies={similarMovies} />
      </div>
    </Container>
  );
};

export default InfoPage;

const Quote = ({ content }: { content: string }) => {
  return (
    <Blockquote.Root colorPalette="red">
      <Blockquote.Content fontStyle="italic" color="gray.300">
        {content}
      </Blockquote.Content>
    </Blockquote.Root>
  );
};
