import { Drawer, Heading, HStack, List, Portal, Text } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import Title from "./Title";
import { navItems } from "./constants";
import SearchInput from "./SearchInput";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <>
      <Heading fontWeight="medium" fontSize="xl" mb={5}>
        Menu
      </Heading>
      <List.Root listStyle="none" gap={4}>
        {navItems.map((navitem) => (
          <List.Item key={navitem.label}>
            <HStack gap={4} onClick={() => navigate(["/", "/donate"].includes(navitem.to) ? navitem.to : navitem.to + "/popular")} cursor="pointer">
              <navitem.icon size={20} />
              <Text fontSize="medium">{navitem.label}</Text>
            </HStack>
          </List.Item>
        ))}
        <SearchInput />
      </List.Root>
    </>
  );
};

export default Sidebar;
