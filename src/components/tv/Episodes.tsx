import useSeason from "@/hooks/useSeason";
import { Box, Skeleton, HStack, Text, SkeletonText } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import ReleaseDate from "../ReleaseDate";
import Runtime from "../Runtime";
import SeasonImage from "./SeasonImage";
import { Episode } from "@/interfaces/Season";
import { useInView } from "react-intersection-observer";

const Episodes = ({
  seriesId,
  seasonNumber,
}: {
  seriesId: number;
  seasonNumber: number;
}) => {
  const { data, error, isLoading } = useSeason(seriesId, seasonNumber);
  if (error) return <h1>Error: {error.message}</h1>;

  if (isLoading) {
    return (
      <Box display="flex" flexDirection="column" gap={5}>
        {Array.from({ length: 5 }).map((_, i) => (
          <EpisodeSkeleton key={i} />
        ))}
      </Box>
    );
  }

  if (!data) return <h1>No data found</h1>;

  return (
    <Box display="flex" flexDirection="column" gap={5}>
      {data.episodes.map((episode) => (
        <EpisodeItem
          key={episode.id}
          episode={episode}
          seasonNumber={seasonNumber}
          seriesId={seriesId}
        />
      ))}
    </Box>
  );
};

interface EpisodeItemProps {
  episode: Episode;
  seasonNumber: number;
  seriesId: number;
}

const EpisodeItem = ({ episode, seriesId, seasonNumber }: EpisodeItemProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const href = `/watch/tv/${seriesId}/${seasonNumber}/${episode.episode_number}`;

  return (
    <Box ref={ref} minH={{ md: "204px" }}>
      {inView ? (
        <Box display="flex" flexDirection={{ base: "column", md: "row" }} gap={5}>
          <Link to={href}>
            <SeasonImage episode={episode} />
          </Link>

          <Box flex="1">
            <HStack gap={4} alignItems="center">
              <Link to={href}>
                <Text fontSize="xl" fontWeight="medium" lineClamp={1}>
                  {episode.name}
                </Text>
              </Link>
            </HStack>

            <HStack>
              <ReleaseDate date={episode.air_date} />
              <Rating vote_average={episode.vote_average} />
              <Runtime runtime={episode.runtime} />
            </HStack>

            {!!episode.overview && (
              <Text lineClamp={{ base: 2, md: 5 }} fontSize="sm">
                {episode.overview}
              </Text>
            )}
          </Box>
        </Box>
      ) : (
        <EpisodeSkeleton />
      )}
    </Box>
  );
};

const EpisodeSkeleton = () => {
  return (
    <Box display="flex" gap={5} flexDir={{ base: "column", md: "row" }}>
      <Skeleton aspectRatio={12 / 7} w={{ base: "full", md: "350px" }} flexShrink={0} />

      <Box flex="1">
        <SkeletonText noOfLines={4} gap={3} />
      </Box>
    </Box>
  );
};

export default Episodes;
