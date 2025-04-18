import useTvSeriesQuery from "@/hooks/useTvSeriesQuery";
import { SimpleGrid, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import { Fragment } from "react/jsx-runtime";

const TvShowsGrid = () => {
  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    error,
  } = useTvSeriesQuery();

  if (isLoading) return <Spinner size="md" />;
  if (error) return <div>Error: {error.message}</div>;

  const resCount =
    data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  return (
    <InfiniteScroll
      dataLength={resCount}
      hasMore={hasNextPage}
      next={fetchNextPage}
      loader={isFetchingNextPage && <Spinner my={3} size="md" />}
      style={{ overflow: "unset" }}
    >
      <SimpleGrid className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.results.map((tvShow) => (
              <Card key={tvShow.id} media={tvShow} />
            ))}
          </Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default TvShowsGrid;
