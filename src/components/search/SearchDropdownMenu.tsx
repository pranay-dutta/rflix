import { Button, Menu, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SearchDropdownMenu = () => {
  const [selectedValue, setSelectedValue] = useState(items[0].value);
  const [open, setOpen] = useState(false);

  return (
    <Menu.Root
      open={open}
      onOpenChange={() => setOpen(!open)}
      onSelect={(e) => setSelectedValue(e.value)}
    >
      <Menu.Trigger asChild>
        <Button
          variant="surface"
          backgroundColor="blackAlpha.800"
          size="sm"
          borderRadius="md"
        >
          {selectedValue}
          {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content zIndex="popover" bg="blackAlpha.800">
            {items.map((item) => (
              <Menu.Item key={item.value} value={item.value}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default SearchDropdownMenu;

const items = [
  { label: "Movies & TV Shows", value: "Movies & TV Shows" },
  { label: "Movies", value: "Movies" },
  { label: "TV Shows", value: "TV Shows" },
];
