import { ColorModeButton } from "@/ui/color-mode";
import {
  Box,
  Drawer,
  HStack,
  Portal,
  SegmentGroup,
  Text,
  List,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { RiMovie2AiFill } from "react-icons/ri";

const Navbar = () => {
  const items = ["Home", "Discover", "Donate"];

  return (
    <HStack px={5} py={2} justifyContent="space-between">
      <Box display="flex" alignItems="center" gap={2}>
        <RiMovie2AiFill color="aqua" size={24} />
        <Text>Nunflix</Text>
      </Box>

      <Box mx="auto" display="none" md={{ display: "block" }}>
        <SegmentGroup.Root defaultValue="Home">
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={items} />
        </SegmentGroup.Root>
      </Box>

      <HStack gap={2}>
        <BiSearch size={24} />
        <ColorModeButton size="sm" />
        <Box>
          <Demo />
        </Box>
      </HStack>
    </HStack>
  );
};

export default Navbar;

const Demo = () => {
  const items = ["Home", "Discover", "Donate"];
  return (
    <Drawer.Root size="xs">
      <Drawer.Trigger asChild>
        <FaBars size={24} />
      </Drawer.Trigger>

      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Box display="flex" alignItems="center" gap={2}>
                <RiMovie2AiFill color="aqua" size={24} />
                <Text>Nunflix</Text>
              </Box>
            </Drawer.Header>
            <Drawer.Body>
              <Text>Menu</Text>
              <List.Root>
                {items.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List.Root>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
