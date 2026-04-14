import { watchProviderTabs } from "@/data";
import useWatchProvider from "@/hooks/useWatchProvider";
import useCustomizationStore from "@/store/customizationStore";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Tabs from "../Tabs";
import RectMediaScroll from "../card/RectMediaScroll";
import { MediaScroll } from "../common";

const WatchProvider = () => {
  const [selectedTab, setSelectedTab] = useState<string>("213");
  const { data: watchProviderData, isLoading } = useWatchProvider(selectedTab);
  const currentTab = watchProviderTabs.find((tab) => tab.value === selectedTab);
  const cardStyle = useCustomizationStore((s) => s.cardStyle);

  return (
    <>
      <Tabs
        tabItems={watchProviderTabs}
        selectedTab={selectedTab}
        heading={"Series on " + currentTab?.label}
        highlight={currentTab?.label}
        setSelectedTab={setSelectedTab}
      />
      <Box my={3}>
        {cardStyle === "vertical" ? (
          <MediaScroll media={watchProviderData} loading={isLoading} />
        ) : (
          <RectMediaScroll media={watchProviderData} loading={isLoading} />
        )}
      </Box>
    </>
  );
};

export default WatchProvider;
