import useCardNavigation from "@/hooks/useCardNavigation";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import { Box, Image } from "@chakra-ui/react";
import { getTMDBImage } from "../constants";
import Skeleton from "../skeleton/Skeleton";

interface Props {
  media: Movie | TvSeries;
}
const VerticalDescriptiveCard = ({ media }: Props) => {
  const { handleCardClick } = useCardNavigation();

  return (
    <Skeleton loading={false} overflow="hidden" borderRadius="sm">
      <Box
        onClick={() => handleCardClick(media)}
        cursor="pointer"
        position="relative"
        aspectRatio={2 / 3}
      >
        <Image
          src={getTMDBImage(media.poster_path, "w342", "vertical")}
          willChange="scale"
          transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          objectFit="cover"
          _hover={{ transform: "scale(1.07)" }}
          loading="lazy"
        />
      </Box>
    </Skeleton>
  );
};

export default VerticalDescriptiveCard;
