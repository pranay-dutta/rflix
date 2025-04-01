import { ColorModeButton } from "@/ui/color-mode";
import { Box, HStack, Text } from "@chakra-ui/react";
import { RiMovie2AiFill } from "react-icons/ri";
import { SegmentGroup } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  return (
    <HStack px={5} py={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <RiMovie2AiFill color="aqua" size={24} />
        <Text>Nun Movies</Text>
      </Box>
      <Box mx="auto">
        <SegmentGroup.Root defaultValue="Home">
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={["Home", "Discover", "Donate"]} />
        </SegmentGroup.Root>
      </Box>
      <HStack gap={2}>
        <BiSearch size={24} />
        <ColorModeButton />
      </HStack>
    </HStack>
  );
};

export default Navbar;
