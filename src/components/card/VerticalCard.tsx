import { Movie } from "@/interfaces/Movie";
import VerticalDescriptiveCard from "./VerticalDescriptiveCard";
import TvSeries from "@/interfaces/TvSeries";
import Description from "../description/Description";
import useCustomizationStore from "@/store/customizationStore";
import { Box } from "@chakra-ui/react";
import VerticalOverlayCard from "./VerticalOverlayCard";

const VerticalCard = ({ media }: { media: Movie | TvSeries }) => {
  const activePalette = useCustomizationStore((s) => s.activePalette);
  const cardType = useCustomizationStore((s) => s.cardType);

  return cardType === "descriptive" ? (
    <Box
      _hover={{ color: `${activePalette}.500` }}
      transition="all 0.3s ease-in-out"
      cursor="pointer"
    >
      <VerticalDescriptiveCard media={media} />
      <Description isLoading={false} media={media} />
    </Box>
  ) : (
    <VerticalOverlayCard media={media} />
  );
};

export default VerticalCard;
