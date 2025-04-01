import { ColorModeButton } from "@/ui/color-mode";
import { Box, HStack, Text } from "@chakra-ui/react";
import { RiMovie2AiFill } from "react-icons/ri";
import { SegmentGroup } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { Drawer } from "@chakra-ui/react";
import { Button, ButtonGroup, CloseButton, Portal } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <HStack px={5} py={2} justifyContent="space-between">
      <Box display="flex" alignItems="center" gap={2}>
        <RiMovie2AiFill color="aqua" size={24} />
        <Text>Nunflix</Text>
      </Box>

      <Box mx="auto" display="none" md={{ display: "block" }}>
        <SegmentGroup.Root defaultValue="Home">
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={["Home", "Discover", "Donate"]} />
        </SegmentGroup.Root>
      </Box>

      <HStack gap={2}>
        <BiSearch size={24} />
        <ColorModeButton />
        <Box><Demo /></Box>
      </HStack>
    </HStack>
  );
};

export default Navbar;

const Demo = () => {
  return (
    <Drawer.Root size="xs">
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Drawer
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.CloseTrigger asChild pos="initial">
                <CloseButton />
              </Drawer.CloseTrigger>
              <Drawer.Title flex="1">Drawer Title</Drawer.Title>
              <ButtonGroup>
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </ButtonGroup>
            </Drawer.Header>
            <Drawer.Body>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
