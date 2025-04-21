// import useTvSeriesQuery from "@/hooks/useTvSeriesQuery";
import { SimpleGrid, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import { Fragment } from "react/jsx-runtime";
import useSearch from "@/hooks/useSearch";

const TvShowsGrid = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    resCount,
  } = useSearch("tv");

  if (isLoading) return <Spinner size="md" />;
  if (error) return <div>Error: {error.message}</div>;

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
