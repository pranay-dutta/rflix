import { Button, CloseButton, Dialog, Flex, Portal } from "@chakra-ui/react";
import { useRef } from "react";
import { LuSearch } from "react-icons/lu";
import SearchInput from "../SearchInput";
import SearchDropdownMenu from "./SearchDropdownMenu";
import { useSearchDialogStore } from "@/store/serachDialogStore";

const SearchDialogButton = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const { isOpen, setOpen } = useSearchDialogStore();

  return (
    <Dialog.Root
      placement="center"
      open={isOpen}
      initialFocusEl={() => ref.current}
      finalFocusEl={undefined} // don't focus on search button after closing
    >
      <Dialog.Trigger asChild onClick={() => setOpen(true)}>
        <Button variant="ghost" size="md">
          <LuSearch size={24} />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(5px)" />
        <Dialog.Positioner>
          <Dialog.Content border="none" boxShadow="none" bg="transparent">
            <Dialog.Header alignItems="center">
              <Dialog.Title>Search</Dialog.Title>
              <Flex position="absolute" zIndex="max" top={0} right={0} p={2} gap={2}>
                {/* Search Dropdown */}
                <SearchDropdownMenu />

                <Dialog.CloseTrigger
                  position="initial"
                  asChild
                  onClick={() => setOpen(false)}
                >
                  <CloseButton
                    bgColor="blackAlpha.800"
                    variant="surface"
                    size="sm"
                    borderRadius="md"
                  />
                </Dialog.CloseTrigger>
              </Flex>
            </Dialog.Header>
            <Dialog.Body mt={-4} px={4} pr={2}>
              {/* Search Input */}
              <SearchInput ref={ref} />
            </Dialog.Body>
            <Dialog.Footer></Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
export default SearchDialogButton;
