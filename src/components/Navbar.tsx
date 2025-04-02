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
import { IconType } from "react-icons";
import { BiSearch } from "react-icons/bi";
import { FaBars, FaDonate, FaHome } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import { RiMovie2AiFill } from "react-icons/ri";

const items: { icon: IconType; label: string }[] = [
  { icon: FaHome, label: "Home" },
  { icon: MdVideoLibrary, label: "Discover" },
  { icon: FaDonate, label: "Donate" },
];

const Navbar = () => {
  return (
    <HStack px={5} py={2} justifyContent="space-between">
      <Box display="flex" alignItems="center" gap={2}>
        <RiMovie2AiFill color="aqua" size={24} />
        <Text fontSize="xl" fontWeight="bold">Nunflix</Text>
      </Box>

      <Box mx="auto" display="none" md={{ display: "block" }}>
        <SegmentGroup.Root defaultValue="Home">
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={items.map((item) => item.label)} />
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
                <RiMovie2AiFill color="aqua" size={40} />
                <Text fontSize="2xl">Nunflix</Text>
              </Box>
            </Drawer.Header>
            <Drawer.Body>
              <Text fontWeight="medium" fontSize="xl" mt={3} mb={5}>Menu</Text>
              <List.Root listStyle="none" gap={3}>
                {items.map((item) => (
                  <List.Item key={item.label}>
                    <HStack gap={4}>
                      <item.icon size={18} />
                      {item.label}
                    </HStack>
                  </List.Item>
                ))}
              </List.Root>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
