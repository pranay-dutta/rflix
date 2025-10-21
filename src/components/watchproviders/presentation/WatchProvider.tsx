import { MediaScroll, MediaScrollHeading } from "@/components/common";
import { Box, Tabs } from "@chakra-ui/react";
import type { WatchProviderType } from "@/hooks/useWatchProvider";
import { WatchProviderProps } from "../container/WatchProviderContainer";

const WatchProvider = ({
  media,
  selectedTab,
  setSelectedTab,
  tabItems,
  width,
}: WatchProviderProps) => {
  if (!media) return null;

  return (
    <>
      {/* Tabs of watch providers */}
      <Tabs.Root
        orientation={width < 768 ? "vertical" : "horizontal"}
        defaultValue={selectedTab}
        onValueChange={(details) => {
          setSelectedTab(details.value as WatchProviderType);
        }}
      >
        <Tabs.List>
          {tabItems.map((item) => {
            return (
              <Tabs.Trigger value={item.value} key={item.value}>
                <Box color={item.color} mr={2}>
                  <item.icon />
                </Box>
                {item.label}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>

        {tabItems.map((item) => (
          <Tabs.Content my={3} key={item.value} value={item.value} color={item.color}>
            <MediaScrollHeading highlight="">
              {"Series on " + item.label}
            </MediaScrollHeading>
          </Tabs.Content>
        ))}
      </Tabs.Root>

      {/* Media scroll for the selected tab */}
      <MediaScroll loop={false} media={media} />
    </>
  );
};

export default WatchProvider;
