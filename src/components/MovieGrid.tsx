import useSearchResponse from "@/hooks/useSearchResponse";
import { Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import MediaGrid from "./MediaGrid";

const MovieGrid = () => {
  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    error,
    resCount,
  } = useSearchResponse("movie");

  if (isLoading) return <Spinner size="md" />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <h1>No data found</h1>;

  return (
    <InfiniteScroll
      dataLength={resCount}
      hasMore={hasNextPage}
      next={fetchNextPage}
      loader={isFetchingNextPage && <Spinner my={3} size="md" />}
      style={{ overflow: "unset" }} // Important! To prevent scroll jump
    >
      <MediaGrid media={data} />
    </InfiniteScroll>
  );
};

export default MovieGrid;
