import usePreventScroll from "@/hooks/usePreventScroll";
import { Box, Button, HStack, Popover, Portal, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuLayoutGrid } from "react-icons/lu";
import { contentBrowseItems, featureBrowseItems } from "./browse_menu";
import BrowseMenuItem from "./BrowseMenuItem";

const BrowseMenu = () => {
  const [open, setOpen] = useState(false);
  usePreventScroll(open);

  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger asChild>
        <Button size="md" variant="ghost">
          <LuLayoutGrid /> Browse
        </Button>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content
            borderRadius="2xl"
            bgColor="blackAlpha.800"
            backdropFilter="blur(5px)"
            border="1px solid"
            borderColor="gray.800"
          >
            <Popover.Title fontWeight="medium" textAlign="center" my={3}>
              Browse
            </Popover.Title>
            <Box height="1px" bgColor="gray.800" mb={2} />
            <Popover.Body display="flex" flexDirection="column">
              {/* Content section and discover */}
              <>
                <Text fontSize="smaller" color="gray.300">
                  CONTENT
                </Text>
                <HStack justifyContent="space-between" my={2}>
                  {contentBrowseItems.map((item) => (
                    <BrowseMenuItem
                      key={item.label}
                      Icon={item.Icon}
                      label={item.label}
                      link={item.link}
                    />
                  ))}
                </HStack>
              </>
              {/* Features */}
              <Text fontSize="smaller" color="gray.300">
                FEATURES
              </Text>
              <HStack justifyContent="space-between" my={2}>
                {featureBrowseItems.map((item) => (
                  <BrowseMenuItem
                    key={item.label}
                    Icon={item.Icon}
                    label={item.label}
                    color={item.color}
                    link={item.link}
                  />
                ))}
              </HStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
export default BrowseMenu;
