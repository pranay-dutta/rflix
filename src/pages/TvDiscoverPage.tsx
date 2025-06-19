import { useTvGenresStore } from "@/store/genreListStore";
import useDiscover from "@/hooks/useDiscover";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Heading, Highlight, Spinner } from "@chakra-ui/react";
import MediaGrid from "@/components/MediaGrid";
import GenrePill from "@/components/common/GenrePill";
import InfiniteScrollEndMessage from "@/components/common/InfiniteScrollEndMessage";

const TvDiscoverPage = () => {
  const {
    resCount,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    data,
    error
  } = useDiscover("tv");


  if (isLoading) return <Spinner size="md" />;
  if (!data) return <h1>No data found </h1>
  if (error) return <h1>Error {error.message}</h1>

  return (
    <>
      <Box mb={5} mt={3}>
        <TvDiscoverHeading />
        <TvGenreList />
      </Box>
      <InfiniteScroll
        dataLength={resCount}
        hasMore={hasNextPage}
        next={fetchNextPage}
        endMessage={<InfiniteScrollEndMessage />}
        loader={isFetchingNextPage && <Spinner my={3} size="md" />}
      >
        <MediaGrid media={data} />
      </InfiniteScroll>
    </>
  )
}

export default TvDiscoverPage

const TvGenreList = () => {
  const tvGenreMap = useTvGenresStore(s => s.tvGenreMap);
  return (
    <Box className="flex gap-2 flex-wrap" my={3}>
      {[...tvGenreMap.values()].map((genre) => <GenrePill key={genre.id} genre={genre} type="tv" />)}
    </Box>
  )
}

const TvDiscoverHeading = () => {
  return (
    <Heading size="3xl" as={"h1"}>
      <Highlight query="TV Shows" styles={{ color: "purple.400" }}>
        Discover TV Shows
      </Highlight>
    </Heading>
  );
}