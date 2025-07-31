import BackButton from "@/components/BackButton";
import { Quote } from "@/components/Quote";
import Rating from "@/components/Rating";
import ReleaseDate from "@/components/ReleaseDate";
import Runtime from "@/components/Runtime";
import useMovie from "@/hooks/useMovie";
import useMovieTrailer from "@/hooks/useMovieTrailer";
import { Text, Heading, HStack, Stack, Box, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const MovieWatchPage = () => {
  const { id } = useParams();
  const { trailers, isLoading } = useMovieTrailer(parseInt(id || "0"));
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  if (!id) throw new Error();

  const { movie } = useMovie(parseInt(id));
  if (!movie) return null;

  const youtubeId = trailers?.find((trailer) => trailer.type === "Trailer")?.key;

  return (
    <Box>
      <Box my={3}>
        <BackButton />
      </Box>
      <Skeleton
        loading={isLoading || isVideoLoading}
        className="w-full aspect-square md:aspect-video"
      >
        <iframe
          className="w-full h-full rounded-md"
          onLoad={() => setIsVideoLoading(false)}
          src={`https://www.youtube.com/embed/${youtubeId}?playlist=${youtubeId}`}
          title="Movie Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
          loading="lazy"
        />
      </Skeleton>
      <Stack gap={5} mt={5}>
        <Heading fontSize="3xl" fontWeight="medium">
          {movie.title}
        </Heading>
        <Quote tagline={movie.tagline} />
        <Text>{movie.overview}</Text>
        <HStack>
          <ReleaseDate date={movie.release_date} />
          <Rating vote_average={movie.vote_average} />
          <Runtime runtime={movie.runtime} />
        </HStack>
      </Stack>
    </Box>
  );
};
export default MovieWatchPage;
