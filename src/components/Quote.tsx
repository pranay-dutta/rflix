import { Blockquote } from "@chakra-ui/react";
export const Quote = ({ tagline }: { tagline: string }) => {
  return (
    <Blockquote.Root colorPalette="red">
      <Blockquote.Content fontStyle="italic" color="gray.300">
        {tagline}
      </Blockquote.Content>
    </Blockquote.Root>
  );
};
