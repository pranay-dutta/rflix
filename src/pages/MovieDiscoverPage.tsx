import { useMovieGenresStore } from "@/store/genreListStore";
import useDiscover from "@/hooks/useDiscover";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Button, Flex, Heading, Highlight, Spinner } from "@chakra-ui/react";
import MediaGrid from "@/components/MediaGrid";
import GenrePill from "@/components/common/GenrePill";
import InfiniteScrollEndMessage from "@/components/common/InfiniteScrollEndMessage";
import SortDropDown from "@/components/common/SortDropDown";

const MovieDiscoverPage = () => {
  const {
    resCount,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    data,
    error
  } = useDiscover("movie");


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

const Other = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box mb={5} mt={3}>
        <MovieDiscoverHeading />
        <Flex my={3} gap={5} >
          <CollapsibleToggleButton open={open} onClick={() => setOpen(!open)} />
          <Box flexGrow={{ base: 1, md: 0 }}>
            <SortDropDown />
          </Box>
        </Flex>
        <CollapsibleBasic open={open}>
          <MovieGenreList />
        </CollapsibleBasic>
      </Box>
      <MovieDiscoverPage />
    </>
  )
}

export default Other


const MovieGenreList = () => {
  const movieGenreMap = useMovieGenresStore(s => s.movieGenreMap);
  return (
    <Box className="flex gap-2 flex-wrap" my={2}>
      {[...movieGenreMap.values()].map((genre) => <GenrePill key={genre.id} genre={genre} type="movie" />)}
    </Box>
  )
}

const MovieDiscoverHeading = () => {
  return (
    <Heading size="3xl" as={"h1"}>
      <Highlight query="Movies" styles={{ color: "purple.400" }}>
        Discover Movies
      </Highlight>
    </Heading>
  );

}

import { ReactNode, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


const CollapsibleToggleButton = ({ onClick, open }: { onClick: () => void, open: boolean }) => {
  return (
    <Button onClick={onClick} display="flex" justifyContent="space-between" width={{ base: "100px", md: "200px" }} variant="outline" size="md" color="gray.300">
      Filters
      {open ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
    </Button>
  )
}

const CollapsibleBasic = ({ children, open }: { open: boolean; children: ReactNode }) => {
  return (
    <Box
      overflow="hidden"
      transition="all 0.4s ease-out"
      maxHeight={open ? "300px" : "0px"} // tweak 300px as needed
    >
      {children}
    </Box>
  );
};