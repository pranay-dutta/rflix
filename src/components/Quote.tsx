import useCustomizationStore from "@/store/customizationStore";
import { Blockquote } from "@chakra-ui/react";

export const Quote = ({ tagline }: { tagline: string }) => {
  const activePalette = useCustomizationStore((s) => s.activePalette);

  return (
    <Blockquote.Root colorPalette={activePalette}>
      <Blockquote.Content fontStyle="italic" color="gray.300">
        {tagline}
      </Blockquote.Content>
    </Blockquote.Root>
  );
};
