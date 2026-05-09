import { Button, Menu, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSearchType, search_menu_items } from "@/store/searchTypeStore";

const SearchDropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const searchType = useSearchType((s) => s.searchType);
  const setMediaType = useSearchType((s) => s.setSearchType);

  return (
    <Menu.Root
      open={open}
      onOpenChange={() => setOpen(!open)}
      onSelect={(e) => setMediaType(e.value)}
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
            {search_menu_items.map((item) => (
              <Menu.Item
                bg={searchType == item.value ? "gray.900" : ""}
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
