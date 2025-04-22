import BackButton from "@/components/BackButton";
import { Quote } from "@/components/Quote";
import Rating from "@/components/Rating";
import ReleaseDate from "@/components/ReleaseDate";
import Runtime from "@/components/Runtime";
import useMovie from "@/hooks/useMovie";
import { Container, Text, Heading, HStack, Stack, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const MovieWatchPage = () => {
  const { id } = useParams();
  if (!id) throw new Error();

  const { movie } = useMovie(parseInt(id));
  if (!movie) return null;

  return (
    <Container py={5}>
      <Box my={3}>
        <BackButton />
      </Box>
      <div className="w-full aspect-square md:aspect-video">
        <iframe
          className="rounded-lg"
          sandbox="allow-same-origin allow-scripts"
          width="100%"
          height="100%"
          src={`https://player.videasy.net/movie/${id}`}
          allowFullScreen
        />
      </div>
      <Stack gap={5} mt={5}>
        <Heading fontSize="3xl" fontWeight="medium">
          {movie.title}
        </Heading>
        <Quote tagline={movie.tagline} />
        <Text>{movie.overview}</Text>
        <HStack>
          <ReleaseDate date={movie.release_date} />
          <Rating rating={movie.vote_average} />
          <Runtime runtime={movie.runtime} />
        </HStack>
      </Stack>
    </Container>
  );
};
export default MovieWatchPage;
