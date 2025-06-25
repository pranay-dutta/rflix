import useSeason from "@/hooks/useSeason";
import { Box, Skeleton, HStack, Text, SkeletonText } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import ReleaseDate from "../ReleaseDate";
import Runtime from "../Runtime";
import SeasonImage from "./SeasonImage";

const Episodes = ({
  seriesId,
  seasonNumber,
}: {
  seriesId: number;
  seasonNumber: number;
}) => {
  const { data, error, isLoading } = useSeason(seriesId, seasonNumber);
  if (error) return <h1>Error: {error.message}</h1>;

  const skeletons = Array.from({ length: 5 });
  if (isLoading)
    return (
      <Box display="flex" flexDirection="column" gap={5}>
        {skeletons.map((_, i) => (
          <Box key={i} display="flex" gap={5} flexDir={{ base: "column", md: "row" }}>
            <Skeleton height="200px" width="350px" />
            <SkeletonText noOfLines={3} gap={2} />
          </Box>
        ))}
      </Box>
    );

  if (!data) return <h1>No data found</h1>;
  return (
    <Box display="flex" flexDirection="column" gap={5}>
      {data.episodes.map((episode) => (
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          gap={5}
          key={episode.id}
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
            <Text fontSize="sm">{episode.overview}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
export default Episodes;
