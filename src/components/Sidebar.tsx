import { Drawer, Heading, HStack, List, Portal, Separator, Stack, Text } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import Title from "./Title";
import { NavItem, NavItemChild, navItems } from "./constants";
import SearchInput from "./SearchInput";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";

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
        {navItems.map((navitem) => <ListItem navitem={navitem} />)}
        <SearchInput />
      </List.Root >
    </>
  );
};
export default Sidebar;

// Each navitem on the sidebar
const ListItem = ({ navitem }: { navitem: NavItem }) => {
  const navigate = useNavigate();

  const [showChildren, setShowChildren] = useState(false);
  const handleClick = (navitem: NavItem) => {
    if (navitem.hasDropdown) {
      setShowChildren(!showChildren);
      return;
    }
    else navigate(navitem.to)
  }

  return (
    <List.Item>
      <HStack
        gap={4}
        onClick={() => handleClick(navitem)}
        cursor="pointer"
      >
        <navitem.icon size={20} />
        <Text fontSize="medium">{navitem.label}</Text>

        {/* Dropdown indicator for child routes */}
        {(navitem.hasDropdown && showChildren) ?
          <MdOutlineKeyboardArrowDown size={20} /> :
          (navitem.hasDropdown && !showChildren) ?
            <MdOutlineKeyboardArrowRight size={20} /> :
            null
        }

      </HStack>
      {(navitem.hasDropdown && showChildren) && <ChildrenCollapsible children={navitem.children} />}
    </List.Item>
  )
}

// Child routes of perticualar navitem
const ChildrenCollapsible = ({ children }: { children: NavItemChild[] }) => {
  return (
    <Stack gap={1} marginStart={9} marginTop={4}>
      {children.map((child) =>
        <Fragment key={child.to}>
          <Link to={child.to}>{child.label}</Link>
          < Separator />
        </Fragment>
      )}
    </Stack>
  )
}