import { watchProviderTabs } from "@/data";
import useWatchProvider from "@/hooks/useWatchProvider";
import useCustomizationStore from "@/store/customizationStore";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import Tabs from "../Tabs";
import RectMediaScroll from "@/components/scroll/RectMediaScroll";
import { MediaScroll } from "../common";

const WatchProvider = () => {
  const [selectedTab, setSelectedTab] = useState<string>("213");
  const { data: watchProviderData, isLoading } = useWatchProvider(selectedTab);
  const currentTab = watchProviderTabs.find((tab) => tab.id === selectedTab);
  const cardStyle = useCustomizationStore((s) => s.cardStyle);
  const [isLargerThan480] = useMediaQuery(["(min-width: 480px)"]);

  return (
    <>
      <Tabs
        tabItems={watchProviderTabs}
        selectedTab={selectedTab}
        heading={"Series on " + currentTab?.name}
        highlight={currentTab?.name}
        setSelectedTab={setSelectedTab}
      />
      <Box my={3}>
        {cardStyle === "horizontal" && isLargerThan480 ? (
          <RectMediaScroll media={watchProviderData} loading={isLoading} />
        ) : (
          <MediaScroll media={watchProviderData} loading={isLoading} />
        )}
      </Box>
    </>
  );
};

export default WatchProvider;
