import { watchProviderTabs } from "@/data";
import useWatchProvider from "@/hooks/useWatchProvider";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Tabs from "../Tabs";
import { MediaScroll } from "../common";

const WatchProvider = () => {
  const [selectedTab, setSelectedTab] = useState<string>("213");
  const { data: watchProviderData, isLoading } = useWatchProvider(selectedTab);
  const currentTab = watchProviderTabs.find((tab) => tab.value === selectedTab);

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
        <MediaScroll loading={isLoading} media={watchProviderData} />
      </Box>
    </>
  );
};

export default WatchProvider;
