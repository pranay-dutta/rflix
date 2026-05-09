import type { SearchMenuValue } from "@/store/searchTypeStore";
import { searchMenuItems, useSearchType } from "@/store/searchTypeStore";
import { Button, Menu, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SearchDropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const searchType = useSearchType((s) => s.searchType);
  const setMediaType = useSearchType((s) => s.setSearchType);

  return (
    <Menu.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      onSelect={(e) => setMediaType(e.value as SearchMenuValue)}
    >
      <Menu.Trigger asChild>
        <Button
          variant="surface"
          backgroundColor="blackAlpha.800"
          size="sm"
          borderRadius="md"
        >
          {searchType}
          {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content zIndex="popover" bg="blackAlpha.800">
            {searchMenuItems.map((item) => (
              <Menu.Item
                bg={searchType == item.value ? "gray.900" : undefined}
                key={item.value}
                value={item.value}
              >
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
