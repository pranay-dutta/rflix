import useCustomizationStore from "@/store/customizationStore";
import { Blockquote, Heading, Highlight } from "@chakra-ui/react";

interface Props {
  children: string;
  highlight: string;
}

const MediaScrollHeading = ({ children, highlight }: Props) => {
  const activePalette = useCustomizationStore((s) => s.activePalette);
  return (
    <Heading
      fontSize={{ lg: "22px", md: "20px", base: "18px" }}
      lineHeight={{ lg: "20px", md: "18px", base: "16px" }}
      fontWeight="medium"
      filter="contrast(2)"
    >
      <Blockquote.Root colorPalette={activePalette} variant="solid">
        <Blockquote.Content>
          <Highlight query={highlight} styles={{ color: `${activePalette}.400` }}>
            {children}
          </Highlight>
        </Blockquote.Content>
      </Blockquote.Root>
    </Heading>
  );
};

export default MediaScrollHeading;
