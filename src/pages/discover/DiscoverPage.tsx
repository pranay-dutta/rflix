import MediaGrid from "@/components/MediaGrid";
import { CollapsibleToggleButton } from "@/components/common/CollapsibleToggleButton";
import { CollapsibleWrapper } from "@/components/common/CollapsibleWrapper";
import InfiniteScrollEndMessage from "@/components/common/InfiniteScrollEndMessage";
import SortDropDown from "@/components/common/SortDropDown";
import MovieGenrePills from "@/components/movie/MovieGenrePills";
import TvGenrePills from "@/components/tv/TvGenrePills";
import useDiscover from "@/hooks/useDiscover";
import {
  Box,
  Text,
  createListCollection,
  Flex,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Center } from "@chakra-ui/react";

const Wrapper = () => {
  const [open, setOpen] = useState(false);
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");
  const activePalette = useCustomizationStore((s) => s.activePalette);
  const {
    resCount,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    data,
    error,
  } = useDiscover(mediaType);

  const handleMediaTypeChange = (type: "movie" | "tv") => {
    setMediaType(type);
  };

  return (
    <Box position="relative" aria-busy="true" userSelect="none">
      <Box mb={5} mt={3}>
        <Box mb={8}>
          <PageHeading query="Movie & TV Shows">
            Discover Movie & TV Shows
          </PageHeading>
        </Box>
        <Flex
          my={3}
          gap={{ base: 1, md: 5 }}
          maxW={{ mdDown: "100%", md: "2/3" }}
        >
          <CollapsibleToggleButton open={open} onClick={() => setOpen(!open)} />
          <SortDropDown mediaType={mediaType} />
          <MediaTypeDropdown
            selected={mediaType}
            onMediaTypeChange={handleMediaTypeChange}
          />
        </Flex>

        {/* Filter Pills*/}
        <CollapsibleWrapper open={open}>
          {mediaType === "movie" ? <MovieGenrePills /> : <TvGenrePills />}
        </CollapsibleWrapper>
      </Box>

      {/* Error and Loading States */}
      {error && <Text color="red.500">Error: {error.message}</Text>}
      {isLoading && (
        <Box pos="absolute" inset="0" bg="bg/80">
          <Center h="full">
            <Spinner color={activePalette + ".700"} />
          </Center>
        </Box>
      )}

      {/* Infinite Scroll Container for movie and tv shows*/}
      {data && !isLoading && (
        <InfiniteScroll
          dataLength={resCount}
          hasMore={hasNextPage}
          next={fetchNextPage}
          endMessage={<InfiniteScrollEndMessage />}
          loader={isFetchingNextPage && <Spinner my={3} size="md" />}
        >
          <MediaGrid media={data} />
        </InfiniteScroll>
      )}
    </Box>
  );
};

export default Wrapper;

import PageHeading from "@/components/common/PageHeading";
import { Portal } from "@chakra-ui/react";
import useCustomizationStore from "@/store/customizationStore";

interface MediaTypeDropdownProps {
  selected: "movie" | "tv";
  onMediaTypeChange: (value: "movie" | "tv") => void;
}

const MediaTypeDropdown = ({
  selected,
  onMediaTypeChange,
}: MediaTypeDropdownProps) => {
  return (
    <Select.Root
      hideBelow="md"
      value={[selected]}
      collection={collections}
      onValueChange={(e) => onMediaTypeChange(e.value[0] as "movie" | "tv")}
    >
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select media type" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collections.items.map((sortItem) => (
              <Fragment key={sortItem.value}>
                <Select.Item item={sortItem}>
                  {sortItem.label}
                  <Select.ItemIndicator />
                </Select.Item>
              </Fragment>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

const collections = createListCollection({
  items: [
    { label: "Movies", value: "movie" },
    { label: "TV Shows", value: "tv" },
  ],
});
