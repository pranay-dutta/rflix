import { Box, Flex, Text } from "@chakra-ui/react";
import { MediaScroll, MediaScrollHeading } from "./common";
import useWatchListStore from "@/store/watchListStore";
import useCustomizationStore from "@/store/customizationStore";
import { Link } from "react-router-dom";

const WatchList = () => {
  const watchList = useWatchListStore((s) => s.watchList);
  const watchListItems = [...watchList.values()].reverse();
  const disableWatchListHomepage = useCustomizationStore(
    (s) => s.disableWatchListHomepage,
  );

  if (disableWatchListHomepage || !watchList.size) return null;

  return (
    <>
      <Flex justifyContent="space-between">
        <Box my={3}>
          <MediaScrollHeading highlight={"Watch List"}>
            Your Watch List
          </MediaScrollHeading>
        </Box>
        <Link to="/watchlist">
          <Text transform={"translateY(6px)"}>View all</Text>
        </Link>
      </Flex>
      <MediaScroll loop={false} watchListItems={watchListItems} />
    </>
  );
};

export default WatchList;
