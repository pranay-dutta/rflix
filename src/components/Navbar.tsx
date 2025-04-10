import { ColorModeButton } from "@/ui/color-mode";
import { Box, HStack, SegmentGroup } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import Sidebar from "./Sidebar";
import Title from "./Title";
import { items } from "./constants";

const Navbar = () => {
  return (
    <HStack
      px={5}
      py={2}
      justifyContent="space-between"
      w={"100%"}
      position="fixed"
      backdropFilter="blur(10px)"
      zIndex="10"
    >
      <Title />

      <Box mx="auto" display="none" md={{ display: "block" }}>
        <SegmentGroup.Root defaultValue="Home">
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={items.map((item) => item.label)} />
        </SegmentGroup.Root>
      </Box>

      <HStack gap={4}>
        <BiSearch size={24} />
        <ColorModeButton size="sm" />
        <Box display={{ md: "none" }}>
          <Sidebar />
        </Box>
      </HStack>
    </HStack>
  );
};

export default Navbar;
