import {
  Box,
  CloseButton,
  Drawer,
  HStack,
  Heading,
  List,
  Portal,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import Title from "./Title";
import { NavItem, NavItemChild, navItems } from "./constants";
import SearchInput from "./SearchInput";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";

//TODO extract components
const Sidebar = () => {
  return (
    <Drawer.Root>
      <Drawer.Trigger cursor="pointer" asChild>
        <FaBars size={24} />
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content maxWidth="250px">
            <Drawer.Header display="flex" justifyContent="space-between">
              <Title />
              <Drawer.CloseTrigger position="static" asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
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
        {navItems.map((navitem) => (
          <ListItem key={navitem.to} navitem={navitem} />
        ))}
        <SearchInput />
      </List.Root>
    </>
  );
};
export default Sidebar;

// Each navitem on the sidebar
const ListItem = React.memo(({ navitem }: { navitem: NavItem }) => {
  const navigate = useNavigate();

  const [showChildren, setShowChildren] = useState(false);
  const handleClick = (navitem: NavItem) => {
    if (navitem.hasDropdown) {
      setShowChildren(!showChildren);
      return;
    } else navigate(navitem.to);
  };

  return (
    <List.Item>
      <HStack
        gap={4}
        onClick={() => handleClick(navitem)}
        cursor="pointer"
        bg="gray.900"
        borderRadius="5px"
        _hover={{ bg: "gray.800" }}
        px={4}
        py={2}
      >
        <navitem.icon size={20} />
        <Text fontSize="medium">{navitem.label}</Text>

        {/* Dropdown indicator for child routes */}
        {navitem.hasDropdown &&
          (showChildren ? (
            <MdOutlineKeyboardArrowDown size={20} />
          ) : (
            <MdOutlineKeyboardArrowRight size={20} />
          ))}
      </HStack>
      {navitem.hasDropdown && showChildren && (
        <ChildrenCollapsible children={navitem.children} />
      )}
    </List.Item>
  );
});

// Child routes of particular navitem
const ChildrenCollapsible = React.memo(({ children }: { children: NavItemChild[] }) => {
  return (
    <Stack gap={2} marginStart={9} marginTop={4}>
      {children.map((child) => (
        <Box key={child.to} w="fit-content" _hover={{ color: "blue.400" }}>
          <Link to={child.to} className="inline-block">
            <Text fontWeight="medium">{child.label}</Text>
          </Link>
          <Separator minW="inherit" />
        </Box>
      ))}
    </Stack>
  );
});
