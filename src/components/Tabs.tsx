import useCustomizationStore from "@/store/customizationStore";
import { Box, Tabs as ChakraTabs, Flex, Text } from "@chakra-ui/react";
import { useLayoutEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { MediaScrollHeading } from "./common";

export interface TabItem {
  value: string;
  label: string;
  icon?: IconType;
  color: string;
}

interface Props {
  tabItems: TabItem[];
  selectedTab: string;
  heading: string;
  highlight?: string;
  setSelectedTab: (value: string) => void;
}

const Tabs = ({ tabItems, selectedTab, heading, highlight, setSelectedTab }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const tabIndex = tabItems.findIndex((t) => t.value === selectedTab);
  const activePalette = useCustomizationStore((s) => s.activePalette);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const triggers = containerRef.current.querySelectorAll('[role="tab"]');
      const activeTab = triggers[tabIndex] as HTMLElement;

      if (activeTab) {
        setIndicatorStyle({
          width: activeTab.offsetWidth,
          left: activeTab.offsetLeft,
        });
      }
    }
  }, [tabIndex]);

  return (
    <ChakraTabs.Root
      value={selectedTab}
      onValueChange={(details) => setSelectedTab(details.value)}
    >
      <Flex justifyContent="space-between" minW="100%" alignItems="center" gap={4}>
        <Box minW="fit-content">
          <MediaScrollHeading highlight={highlight || ""}>{heading}</MediaScrollHeading>
        </Box>

        <Box maxW={{ base: "200px", md: "400px", lg: "700px" }} overflow="hidden">
          <ChakraTabs.List
            ref={containerRef}
            position="relative"
            display="flex"
            textWrap="nowrap"
            overflowX="auto"
            overflowY="hidden"
            _scrollbar={{ display: "none" }}
            scrollBehavior="smooth"
          >
            {tabItems.map((item) => (
              <ChakraTabs.Trigger
                key={item.value}
                value={item.value}
                _before={{ display: "none" }}
                flexShrink={0}
              >
                <Text>{item.label}</Text>
              </ChakraTabs.Trigger>
            ))}

            <Box
              position="absolute"
              bottom="0"
              height="2px"
              bg={activePalette + ".400"}
              borderRadius="full"
              width={`${indicatorStyle.width}px`}
              left={`${indicatorStyle.left}px`}
              transition="all 0.3s ease-in-out"
              boxShadow={`-0px -5px 20px 1px ${activePalette}`}
            />
          </ChakraTabs.List>
        </Box>
      </Flex>
    </ChakraTabs.Root>
  );
};

export default Tabs;
