import useSeason from "@/hooks/useSeason";
import { Box, Skeleton, HStack, Text, SkeletonText } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import ReleaseDate from "../ReleaseDate";
import Runtime from "../Runtime";
import SeasonImage from "./SeasonImage";
import { Episode } from "@/interfaces/Season";
import { useInView } from "react-intersection-observer";
import { useWindowSize } from "@uidotdev/usehooks";

const Episodes = ({
  seriesId,
  seasonNumber,
}: {
  seriesId: number;
  seasonNumber: number;
}) => {
  const { data, error, isLoading } = useSeason(seriesId, seasonNumber);
  const { width } = useWindowSize();
  const imageHeight = Math.ceil((width && ((width - 32) * 7) / 12) || 0);

  if (error) return <h1>Error: {error.message}</h1>;

  const skeletons = Array.from({ length: 5 });
  if (isLoading)
    return (
      <Box display="flex" flexDirection="column" gap={5}>
        {skeletons.map((_, i) => (
          <Box key={i} display="flex" gap={5} flexDir={{ base: "column", md: "row" }}>
            <Skeleton aspectRatio={12 / 7} w={{ base: "full", md: "350px" }} />
            <SkeletonText noOfLines={3} gap={2} />
          </Box>
        ))}
      </Box>
    );

  if (!data) return <h1>No data found</h1>;
  return (
    <Box display="flex" flexDirection="column" gap={5}>
      {data.episodes.map((episode) => (
        <EpisodeItem
          key={episode.id}
          episode={episode}
          seasonNumber={seasonNumber}
          seriesId={seriesId}
          imageHeight={imageHeight}
        />
      ))}
    </Box>
  );
};

interface EpisodeItemProps {
  episode: Episode;
  seasonNumber: number;
  seriesId: number;
  imageHeight: number;
}

const EpisodeItem = ({
  episode,
  seriesId,
  seasonNumber,
  imageHeight,
}: EpisodeItemProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const textHeight = 116;
  const totalHeight = imageHeight + textHeight;

  return (
    <Box ref={ref} minHeight={{ base: totalHeight, md: "204px" }}>
      {inView && (
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          height={{ base: totalHeight, md: "204px" }}
          gap={5}
        >
          <Link to={`/watch/tv/${seriesId}/${seasonNumber}/${episode.episode_number}`}>
            <SeasonImage key={episode.id} episode={episode} />
          </Link>
          <Box>
            <HStack gap={4} alignItems="center">
              <Link
                to={`/watch/tv/${seriesId}/${seasonNumber}/${episode.episode_number}`}
              >
                <Text fontSize="xl" fontWeight="medium">
                  {episode.name}
                </Text>
              </Link>
            </HStack>
            <HStack>
              <ReleaseDate date={episode.air_date} />
              <Rating vote_average={episode.vote_average} />
              <Runtime runtime={episode.runtime} />
            </HStack>
            <Text lineClamp={{ base: 2, md: 5 }} fontSize="sm">
              {episode.overview}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Episodes;
