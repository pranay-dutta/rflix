import useTvSeriesLists, { TvSeriesTags } from "@/hooks/useTvSeriesLists";
import { Box, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import MediaGrid from "./MediaGrid";
import { MediaListHeading } from "./common/MediaListHeading";
import InfiniteScrollEndMessage from "./common/InfiniteScrollEndMessage";

const TvSeriesGrid = () => {
  const { tag } = useParams();
  if (!tag) throw new Error("Movie Grid");

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    error,
    resCount,
  } = useTvSeriesLists(tag as TvSeriesTags);

  if (isLoading) return <Spinner size="md" />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <h1>No data found</h1>;

  return (
    <>
      <Box mb={5} mt={3}>
        <MediaListHeading tag={tag as TvSeriesTags} mediaType="TV Shows" />
      </Box>
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
    </>
  );
};
export default TvSeriesGrid;