import useCustomizationStore from "@/store/customizationStore";
import { Heading, Highlight } from "@chakra-ui/react";

interface Props {
  children: string;
  highlight: string;
}

const MediaScrollHeading = ({ children, highlight }: Props) => {
  const activePalette = useCustomizationStore((s) => s.activePalette);
  return (
    <Heading
      fontSize={{ lg: "2xl", md: "xl", sm: "lg" }}
      fontWeight="medium"
      filter="contrast(2)"
    >
      <Highlight query={highlight} styles={{ color: `${activePalette}.400` }}>
        {children}
      </Highlight>
    </Heading>
  );
};

export default MediaScrollHeading;
