import { Box, Flex, Text } from "@chakra-ui/react";
import { Tabs as ChakraTabs } from "@chakra-ui/react";
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
  const tabIndex = tabItems.findIndex((t) => t.value === selectedTab);

  return (
    <ChakraTabs.Root
      value={selectedTab}
      onValueChange={(details) => setSelectedTab(details.value)}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <MediaScrollHeading highlight={highlight || ""}>{heading}</MediaScrollHeading>

        <ChakraTabs.List position="relative" minW="fit-content" display="flex">
          {tabItems.map((item) => (
            <ChakraTabs.Trigger
              key={item.value}
              value={item.value}
              _before={{ display: "none" }}
            >
              {item.icon && <Box mr={2}>{<item.icon />}</Box>}
              <Text>{item.label}</Text>
            </ChakraTabs.Trigger>
          ))}

          <Box
            position="absolute"
            bottom="0"
            height="2px"
            bg="red"
            borderRadius="full"
            width={`${100 / tabItems.length}%`}
            transform={`translateX(${tabIndex * 100}%)`}
            transition="all 0.3s ease-in-out"
            boxShadow="-0px -5px 20px 1px rgba(255, 0, 0, 1)"
          />
        </ChakraTabs.List>
      </Flex>
    </ChakraTabs.Root>
  );
};

export default Tabs;
