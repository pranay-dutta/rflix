import PageHeading from "@/components/common/PageHeading";
import WatchListCard from "@/components/common/WatchListCard";
import useCustomizationStore from "@/store/customizationStore";
import useWatchListStore from "@/store/watchListStore";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { GiEmptyWoodBucket, GiSightDisabled } from "react-icons/gi";

const WatchList = () => {
  const wishListItems = useWatchListStore((state) => state.watchList);
  const clearWatchList = useWatchListStore((state) => state.clearWatchList);

  const disableWatchList = useCustomizationStore((state) => state.disableWatchList);
  const activePalette = useCustomizationStore((s) => s.activePalette);

  const isBelow480 = useMediaQuery("only screen and (max-width: 480px)");

  if (disableWatchList) {
    return (
      <Flex mt={3} flexDir="column" gap={5} minH="80vh">
        <PageHeading query="Disabled">Your Watch List is Disabled</PageHeading>
        <Heading size="md" fontWeight="normal">
          Please enable the watch list feature in the customization settings.
          <br />
          <Link to="/customize">
            <Text color={`${activePalette}.300`}>Enable watch list from here</Text>
          </Link>
          <Flex
            justifyContent="center"
            color="gray.900"
            alignItems="center"
            h="50vh"
            mt={5}
          >
            <GiSightDisabled size={300} />
          </Flex>
        </Heading>
      </Flex>
    );
  }

  if (wishListItems.size === 0) {
    return (
      <Box mt={3} minH={"80vh"}>
        <PageHeading query="Watch List">Your Watch List</PageHeading>
        <Heading size="md" mt={3} fontWeight="normal">
          Your List is empty. Add movies or TV shows to your watch list to see them here.
        </Heading>
        <Flex
          justifyContent="center"
          color="gray.900"
          alignItems="center"
          h="50vh"
          mt={5}
        >
          <GiEmptyWoodBucket size={300} />
        </Flex>
      </Box>
    );
  }

  return (
    <Box>
      <Flex mb={5} mt={3} justify="space-between" alignItems="flex-end">
        <PageHeading query="Watch List">Your Watch List</PageHeading>
        <Flex
          alignItems="center"
          gap={2}
          _hover={{ color: "red.600", cursor: "pointer" }}
          onClick={clearWatchList}
        >
          <Heading size="md" fontWeight="normal">
            {isBelow480 ? "Clear list" : "Clear your watch list"}
          </Heading>
          <MdDeleteForever />
        </Flex>
      </Flex>
      <Grid
        templateColumns={{
          base: "repeat(auto-fill, minmax(150px, 1fr))",
          md: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
        gap={4}
      >
        {[...wishListItems.values()].reverse().map((item) => (
          <WatchListCard key={item.id} watchListItem={item} />
        ))}
      </Grid>
    </Box>
  );
};
export default WatchList;
