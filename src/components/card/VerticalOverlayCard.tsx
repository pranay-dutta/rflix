import { Movie } from "@/interfaces/Movie";
import { Box, Image, Text, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { getTMDBImage } from "../constants";
import Rating from "../Rating";
import TvSeries from "@/interfaces/TvSeries";
import Gradient from "../Gradient";
import isMovie from "@/utils/isMovie";
import Skeleton from "../skeleton/Skeleton";
import useCardNavigation from "@/hooks/useCardNavigation";
interface Props {
  media: Movie | TvSeries;
}
const badgeStyles = {
  borderRadius: "sm",
  px: 2,
  py: 0.5,
  fontSize: "x-small",
  color: "white",
  fontWeight: "semibold",
  bg: "blackAlpha.600",
  position: "absolute" as const,
};

const VerticalOverlayCard = ({ media }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const { handleCardClick } = useCardNavigation();

  return (
    <Skeleton
      borderRadius="sm"
      loading={false}
      className="cursor-pointer"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => handleCardClick(media)}
      overflow="hidden"
    >
      {/* Image of movie card */}
      <Box aspectRatio={2 / 3} position="relative">
        <Image
          transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          filter={show ? "brightness(0.7)" : "brightness(1)"}
          transform={show ? "scale3d(1.04, 1.04, 1)" : "scale3d(1, 1, 1)"}
          willChange="transform, filter"
          src={getTMDBImage(media.poster_path, "w342", "vertical")}
          alt={isMovie(media) ? media.title : media.original_name}
          objectFit="cover"
          loading="lazy"
        />
        <Box
          transition="opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          opacity={show ? 0.7 : 0}
        >
          <Gradient.Bottom />
        </Box>

        {/* Movie card rating and release date*/}
        <Text {...badgeStyles} right={1} top={1} transition="all 0.3s ease-in-out">
          {isMovie(media) ? "MOVIE" : "TV SHOW"}
        </Text>

        {/* Rating */}
        <Rating
          {...badgeStyles}
          left={1}
          top={1}
          transition="all 0.3s ease-out"
          fontSize="x-small"
          vote_average={media.vote_average}
        />

        {/* Movie title and overview */}
        <Stack
          opacity={show ? 1 : 0}
          transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          transform={show ? "translateY(0)" : "translateY(20px)"}
          position="absolute"
          bottom={4}
          px={2}
          w="full"
          gap={2}
        >
          <Text
            fontSize="md"
            fontWeight="semibold"
            textWrap="balance"
            letterSpacing="0.025em"
          >
            {isMovie(media) ? media.title : media.name}
          </Text>
          <Text
            fontSize="xs"
            lineClamp="2"
            lineHeight="1.2"
            opacity={0.75}
            textShadow="0 1px 6px rgba(0, 0, 0, 0.8)"
            letterSpacing="0.015em"
          >
            {media.overview}
          </Text>
        </Stack>
      </Box>
    </Skeleton>
  );
};

export default VerticalOverlayCard;
