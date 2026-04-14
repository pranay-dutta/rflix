import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import { Box, Text, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { Image } from "@chakra-ui/react";
import useRectPoster from "@/hooks/useRectPoster";
import isMovie from "@/utils/isMovie";
import Rating from "../Rating";
import { useNavigate } from "react-router-dom";

interface Props   {
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

const RectCard = ({ media }: Props) => {
  const mediaType = isMovie(media) ? "movie" : "tv";
  const [imgLoading, setImgLoading] = useState(true);
  const { data: rectPosterPath, isLoading } = useRectPoster(media.id, mediaType);
  const navigate = useNavigate();

  return (
    <Skeleton
      loading={imgLoading || isLoading}
      aspectRatio={16 / 9}
      overflow="hidden"
      borderRadius="sm"
    >
      <Box position="relative">
        <Image
          onLoad={() => setImgLoading(false)}
          src={rectPosterPath}
          _hover={{ transform: "scale(1.07)" }}
          transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          objectFit="cover"
          aspectRatio={16 / 9}
          cursor="pointer"
          willChange="scale"
          onClick={() => navigate(`/info/${mediaType}/${media.id}`)}
        />

        {/* Media Type Badge */}
        <Text {...badgeStyles} top={1} right={1}>
          {isMovie(media) ? "MOVIE" : "TV SHOW"}
        </Text>

        {/* Rating */}
        <Text {...badgeStyles} top={1} left={1}>
          <Rating vote_average={media.vote_average} fontSize="x-small" />
        </Text>
      </Box>
    </Skeleton>
  );
};

export default RectCard;
