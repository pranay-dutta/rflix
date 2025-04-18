import useMoviesQuery from "@/hooks/useMoviesQuery";
import { SimpleGrid, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Fragment } from "react/jsx-runtime";
import Card from "./Card";

const MovieGrid = () => {
  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    error,
  } = useMoviesQuery();

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
      style={{ overflow: "unset" }} // Important! To prevent scroll jump
    >
      <SimpleGrid className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.results.map((movie) => (
              <Card key={movie.id} media={movie} />
            ))}
          </Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default MovieGrid;
