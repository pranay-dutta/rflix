import useDiscover from "@/hooks/useDiscover";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import MediaGrid from "@/components/MediaGrid";
import InfiniteScrollEndMessage from "@/components/common/InfiniteScrollEndMessage";
import SortDropDown from "@/components/common/SortDropDown";
import { useState } from "react";
import MovieGenrePills from "@/components/movie/MovieGenrePills";
import { CollapsibleWrapper } from "@/components/common/CollapsibleWrapper";
import PageHeading from "@/components/common/PageHeading";
import { CollapsibleToggleButton } from "@/components/common/CollapsibleToggleButton";

const MovieDiscoverPage = () => {
  const {
    resCount,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    data,
    error,
  } = useDiscover("movie");

  if (isLoading) return <Spinner size="md" />;
  if (!data) return <h1>No data found </h1>;
  if (error) return <h1>Error {error.message}</h1>;

  return (
    <InfiniteScroll
      dataLength={resCount}
      hasMore={hasNextPage}
      next={fetchNextPage}
      endMessage={<InfiniteScrollEndMessage />}
      loader={isFetchingNextPage && <Spinner my={3} size="md" />}
    >
      <MediaGrid media={data} />
    </InfiniteScroll>
  );
};

const Wrapper = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box mb={5} mt={3}>
        <PageHeading query="Movies">Discover Movies</PageHeading>
        <Flex my={3} gap={5}>
          <CollapsibleToggleButton open={open} onClick={() => setOpen(!open)} />
          <Box flexGrow={{ base: 1, md: 0 }}>
            <SortDropDown mediaType="movie" />
          </Box>
        </Flex>
        <CollapsibleWrapper open={open}>
          <MovieGenrePills />
        </CollapsibleWrapper>
      </Box>

      {/* Isolated query grid to avoid erasing select component state on query*/}
      <MovieDiscoverPage />
    </>
  );
};

export default Wrapper;
