import useCustomizationStore from "@/store/customizationStore";
import {
  Box,
  Flex,
  Portal,
  Select,
  SelectValueChangeDetails,
  createListCollection,
} from "@chakra-ui/react";

const CustomizeCardStyle = () => {
  const cardStyle = useCustomizationStore((s) => s.cardStyle);
  const setCardStyle = useCustomizationStore((s) => s.setCardStyle);

  const handleValueChange = (e: SelectValueChangeDetails) => {
    setCardStyle(e.value[0] as "vertical" | "horizontal");
  };

  return (
    <Flex
      height="100%"
      width="100%"
      gap={4}
      direction={{ base: "column", md: "row" }}
      align={{ base: "stretch", md: "center" }}
    >
      <Select.Root
        collection={options}
        size="sm"
        width="full"
        maxW="320px"
        value={cardStyle ? [cardStyle] : []}
        onValueChange={(e) => handleValueChange(e)}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select card style" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {options.items.map((option) => (
                <Select.Item item={option} key={option.value}>
                  {option.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      <Flex gap={2} wrap="wrap" align="center">
        {cardStyle === "vertical" ? (
          <>
            <Box w="64px" bg="gray.500" aspectRatio={2 / 3} borderRadius="sm" />
            <Box w="64px" bg="gray.500" aspectRatio={2 / 3} borderRadius="sm" />
          </>
        ) : (
          <>
            <Box w="112px" bg="gray.500" aspectRatio={16 / 9} borderRadius="sm" />
            <Box w="112px" bg="gray.500" aspectRatio={16 / 9} borderRadius="sm" />
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default CustomizeCardStyle;

const options = createListCollection({
  items: [
    { label: "Vertical", value: "vertical" },
    { label: "Horizontal", value: "horizontal" },
  ],
});
