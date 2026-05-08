import InfiniteScrollEndMessage from "@/components/common/InfiniteScrollEndMessage";
import PageHeading from "@/components/common/PageHeading";
import MediaGrid from "@/components/MediaGrid";
import useMovieLists, { MovieTags } from "@/hooks/useMovieLists";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieRadioSelector from "./MovieRadioSelector";

const MoviePage = () => {
  const [tag, setTag] = useState<MovieTags>("popular");
  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    error,
    resCount,
  } = useMovieLists(tag);

  const handleSetTags = (newTag: string | null) => {
    if (!newTag) return;
    setTag(newTag as MovieTags);
  };
  const headerTitle = `${tag.charAt(0).toUpperCase() + tag.slice(1).replace("_", " ")} movies`;

  return (
    <Box>
      <Box mb={5} mt={3}>
        <PageHeading query={headerTitle}>{headerTitle}</PageHeading>
        <MovieRadioSelector value={tag} setValue={handleSetTags} />
      </Box>

      {/* Loading and Error States */}
      {isLoading && <Spinner size="md" />}
      {error && <Text color="red.500">Error: {error.message}</Text>}
      {!data && !isLoading && <Text>No data found</Text>}

      {data && !isLoading && (
        <InfiniteScroll
          dataLength={resCount}
          hasMore={hasNextPage}
          next={fetchNextPage}
          endMessage={<InfiniteScrollEndMessage />}
          loader={isFetchingNextPage && <Spinner my={3} size="md" />}
          style={{ overflow: "unset" }} // Important! To prevent scroll jump
        >
          <MediaGrid media={data} />
        </InfiniteScroll>
      )}
    </Box>
  );
};

export default MoviePage;
