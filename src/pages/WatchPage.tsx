import { useParams } from "react-router-dom";
import {
  AspectRatio,
  Text,
  Heading,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import useMovie from "@/hooks/useMovie";

const WatchPage = () => {
  const { id } = useParams();
  if (!id) throw new Error();

  const { movie } = useMovie(parseInt(id));
  if (!movie) return null;

  return (
    <SimpleGrid
      p={10}
      gap={10}
      columns={{
        base: 1,
        md: 2,
      }}
    >
      <Stack gap={5}>
        <Heading size="4xl">{movie.original_title}</Heading>
        <Text>{movie.overview}</Text>
        <Text>Release date: {movie.release_date}</Text>
        <Text>Popularity: {Math.round(movie.popularity)}</Text>
      </Stack>

      <AspectRatio bg="bg.muted" ratio={2 / 1}>
        <iframe
          src={`https://player.videasy.net/movie/${id}`}
          allowFullScreen
        />
      </AspectRatio>
    </SimpleGrid>
  );
};

export default WatchPage;
