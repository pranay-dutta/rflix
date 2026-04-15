import useRectPoster from "@/hooks/useRectPoster";
import useTrailer from "@/hooks/useTrailer";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import isMovie from "@/utils/isMovie";
import { Box, HStack, Image, Skeleton, Text } from "@chakra-ui/react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { useRef } from "react";

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

const RectCard = ({ media }: Props) => {
  const mediaType = isMovie(media) ? "movie" : "tv";

  const [imgLoading, setImgLoading] = useState(true);
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  //TODO: Try to get media and external ids in the same request to avoid multiple requests
  const { data: rectPosterPath, isLoading } = useRectPoster(media.id, mediaType);

  //Video Trailer
  const { data: trailerURL, isFetching: trailerFetching } = useTrailer(
    media.id,
    mediaType,
    isPreviewActive,
  );

  const navigate = useNavigate();
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePointerEnter = () => {
    //Don't keep delay if there is no URL
    if (!trailerURL) {
      setIsPreviewActive(true);
      return;
    }

    hoverTimer.current = setTimeout(() => {
      setIsPreviewActive(true);
    }, 1000);
  };

  const handlePointerLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    setIsPreviewActive(false);
  };
  const show = !isPreviewActive || trailerFetching;

  return (
    <Skeleton
      loading={imgLoading || isLoading}
      aspectRatio={16 / 9}
      overflow="hidden"
      borderRadius="sm"
    >
      <Box
        position="relative"
        aspectRatio={16 / 9}
        cursor="pointer"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={() => navigate(`/info/${mediaType}/${media.id}`)}
      >
        {show && (
          <Image
            onLoad={() => setImgLoading(false)}
            src={rectPosterPath}
            _hover={{ transform: "scale(1.07)" }}
            transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            objectFit="cover"
            aspectRatio={16 / 9}
            willChange="scale"
            h="full"
            w="full"
          />
        )}

        {/* Trailer while hovering */}
        {isPreviewActive && trailerURL && (
          <Box position="relative" overflow="hidden" h="100%">
            {/* TODO: Might remove react player and use just iframe */}
            <ReactPlayer src={trailerURL} playing muted width="100%" height="100%" />
          </Box>
        )}

        {/* Media Type Badge */}
        {show && (
          <Text {...badgeStyles} top={1} right={1}>
            {isMovie(media) ? "MOVIE" : "TV SHOW"}
          </Text>
        )}

        {/* Rating */}
        {show && (
          <HStack {...badgeStyles} fontSize="x-small" gap={1} top={1} left={1}>
            <FaStar color="orange" />
            {media.vote_average.toFixed(1)}
          </HStack>
        )}
      </Box>
    </Skeleton>
  );
};

export default RectCard;
