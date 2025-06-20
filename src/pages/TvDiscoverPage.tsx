import useDiscover from "@/hooks/useDiscover";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import MediaGrid from "@/components/MediaGrid";
import InfiniteScrollEndMessage from "@/components/common/InfiniteScrollEndMessage";
import TvGenrePills from "@/components/tv/TvGenrePills";
import { useState } from "react";
import DiscoverPageHeading from "@/components/common/DiscoverPageHeading";
import { CollapsibleWrapper } from "@/components/common/CollapsibleWrapper";
import SortDropDown from "@/components/common/SortDropDown";
import { CollapsibleToggleButton } from "@/components/common/CollapsibleToggleButton";

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
    <InfiniteScroll
      dataLength={resCount}
      hasMore={hasNextPage}
      next={fetchNextPage}
      endMessage={<InfiniteScrollEndMessage />}
      loader={isFetchingNextPage && <Spinner my={3} size="md" />}
    >
      <MediaGrid media={data} />
    </InfiniteScroll>
  )
}

const Wrapper = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box mb={5} mt={3}>
        <DiscoverPageHeading query="TV Shows">
          Discover TV Shows
        </DiscoverPageHeading>

        <Flex my={3} gap={5} >
          <CollapsibleToggleButton open={open} onClick={() => setOpen(!open)} />
          <Box flexGrow={{ base: 1, md: 0 }}>
            <SortDropDown mediaType="tv" />
          </Box>
        </Flex>

        <CollapsibleWrapper open={open}>
          <TvGenrePills />
        </CollapsibleWrapper>
      </Box>

      <TvDiscoverPage />
    </>
  )
}
export default Wrapper