import useCustomizationStore from "@/store/customizationStore";
import { Flex, RadioCard } from "@chakra-ui/react";
import { movieRadioItems, tvRadioItems } from "./radio";

interface RadioSelectorProps {
  value: string;
  mediaType: "movie" | "tv";
  setValue: (value: string | null) => void;
}

const RadioSelector = ({ value, mediaType, setValue }: RadioSelectorProps) => {
  const activePalette = useCustomizationStore((s) => s.activePalette);

  // Determine which set of radio items to display based on mediaType
  const items = mediaType === "movie" ? movieRadioItems : tvRadioItems;

  return (
    <RadioCard.Root
      value={value}
      onValueChange={(e) => setValue(e.value)}
      colorPalette={activePalette}
      variant="surface"
      my={8}
    >
      <Flex
        flexDirection={{ smDown: "column", md: "row" }}
        align="stretch"
        gap={4}
        wrap="wrap"
      >
        {items.map((item) => (
          <RadioCard.Item
            key={item.value}
            value={item.value}
            border="1px solid"
            borderColor={item.value === value ? activePalette + ".800" : "gray.800"}
          >
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl display="flex" alignItems="center" gap={2}>
              <item.Icon color={activePalette} size={20} />
              <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </Flex>
    </RadioCard.Root>
  );
};

export default RadioSelector;
