import { Box, Flex, Text } from "@chakra-ui/react";
import { MediaScrollHeading } from "./common";
import useWatchListStore from "@/store/watchListStore";
import useCustomizationStore from "@/store/customizationStore";
import { Link } from "react-router-dom";
import WatchListScroll from "./scroll/WatchListScroll";
import WatchListRectScroll from "./scroll/WatchListRectScroll";

const WatchList = () => {
  const watchList = useWatchListStore((s) => s.watchList);
  const watchListItems = [...watchList.values()].reverse();
  const disableWatchListHomepage = useCustomizationStore(
    (s) => s.disableWatchListHomepage,
  );

  const cardStyle = useCustomizationStore((s) => s.cardStyle);

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
      <Box my={3}>
        {cardStyle === "vertical" ? (
          <WatchListScroll watchListItems={watchListItems} loading={false} />
        ) : (
          <WatchListRectScroll watchListItems={watchListItems} loading={false} />
        )}
      </Box>
    </>
  );
};

export default WatchList;
