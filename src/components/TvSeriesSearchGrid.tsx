import useSearchResponse from "@/hooks/useSearchResponse";
import { Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import MediaGrid from "./MediaGrid";
import InfiniteScrollEndMessage from "./common/InfiniteScrollEndMessage";

const TvSeriesSearchGrid = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    resCount,
  } = useSearchResponse("tv");

  if (isLoading) return <Spinner size="md" />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <h1>No data found</h1>;

  return (
    <InfiniteScroll
      dataLength={resCount}
      hasMore={hasNextPage}
      next={fetchNextPage}
      endMessage={<InfiniteScrollEndMessage />}
      loader={isFetchingNextPage && <Spinner my={3} size="md" />}
      style={{ overflow: "unset" }}
    >
      <MediaGrid media={data} />
    </InfiniteScroll>
  );
};

export default TvSeriesSearchGrid;
