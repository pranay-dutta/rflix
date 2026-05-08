import InfiniteScrollEndMessage from "@/components/common/InfiniteScrollEndMessage";
import PageHeading from "@/components/common/PageHeading";
import MediaGrid from "@/components/MediaGrid";
import RadioSelector from "@/components/radioselector/RadioSelector";
import useTvSeriesLists, { TvSeriesTags } from "@/hooks/useTvSeriesLists";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const TVPage = () => {
  const [currentTag, setTag] = useState<TvSeriesTags>("popular");
  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    error,
    resCount,
  } = useTvSeriesLists(currentTag);

  const handleSetTags = (newTag: string | null) => {
    if (!newTag) return;
    setTag(newTag as TvSeriesTags);
  };
  const headerTitle = `${currentTag.charAt(0).toUpperCase() + currentTag.slice(1).replace(/_/g, " ")} shows`;

  return (
    <Box>
      <Box mb={5} mt={3}>
        <PageHeading query={headerTitle}>{headerTitle}</PageHeading>
        <RadioSelector value={currentTag} mediaType="tv" setValue={handleSetTags} />
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

export default TVPage;
