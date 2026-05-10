import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
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
  const disableWatchList = useCustomizationStore((s) => s.disableWatchList);
  const cardStyle = useCustomizationStore((s) => s.cardStyle);
  const [isLargerThan480] = useMediaQuery(["(min-width: 480px)"]);

  if (!watchListItems.length || disableWatchListHomepage || disableWatchList) return null;

  return (
    <Box mb={{ smDown: 10, md: 10, lg: 20 }}>
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
        {cardStyle === "horizontal" && isLargerThan480 ? (
          <WatchListRectScroll watchListItems={watchListItems} />
        ) : (
          <WatchListScroll watchListItems={watchListItems} />
        )}
      </Box>
    </Box>
  );
};

export default WatchList;
