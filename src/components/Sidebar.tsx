import { Drawer, Heading, HStack, List, Portal, Text } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import Title from "./Title";
import { items } from "./constants";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <FaBars size={24} />
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content maxWidth="250px">
            <Drawer.Header>
              <Title />
            </Drawer.Header>
            <Drawer.Body>
              <DrawerMenu />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
const DrawerMenu = () => {
  return (
    <>
      <Heading fontWeight="medium" fontSize="xl" mb={5}>
        Menu
      </Heading>
      <List.Root listStyle="none" gap={4}>
        {items.map((item) => (
          <List.Item key={item.label}>
            <HStack gap={4}>
              <item.icon size={20} />
              <Text fontSize="medium">{item.label}</Text>
            </HStack>
          </List.Item>
        ))}
        <SearchInput />
      </List.Root>
    </>
  );
};

export default Sidebar;
