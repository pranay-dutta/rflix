import useCustomizationStore from "@/store/customizationStore";
import { Heading, Highlight } from "@chakra-ui/react";

interface Props {
  children: string;
  highlight: string;
}

const MediaScrollHeading = ({ children, highlight }: Props) => {
  const activePalette = useCustomizationStore((s) => s.activePalette);
  return (
    <Heading fontSize="2xl" fontWeight="bold" filter="contrast(2)">
      <Highlight query={highlight} styles={{ color: `${activePalette}.400` }}>
        {children}
      </Highlight>
    </Heading>
  );
};

export default MediaScrollHeading;
