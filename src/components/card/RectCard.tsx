import useRectPoster from "@/hooks/useRectPoster";
import useTrailer from "@/hooks/useTrailer";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import isMovie from "@/utils/isMovie";
import { Box, HStack, Image, Progress, Skeleton, Text } from "@chakra-ui/react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { useRef } from "react";
import useCustomizationStore from "@/store/customizationStore";

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
  const activePalette = useCustomizationStore((s) => s.activePalette);

  const [imgLoading, setImgLoading] = useState(true);
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  //TODO: Try to get media and external ids in the same request to avoid multiple requests
  const { data: rectPosterPath, isLoading } = useRectPoster(media.id, mediaType);

  //Video Trailer
  const {
    data: trailerURL,
    isFetching: trailerFetching,
    fetchStatus,
  } = useTrailer(media.id, mediaType, isPreviewActive);

  const navigate = useNavigate();
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePointerEnter = () => {
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
  const showPoster = !isPreviewActive || trailerFetching || !trailerURL;
  const showBadges = fetchStatus === "idle" && !isPreviewActive;
  const showVideo = isPreviewActive && trailerURL;

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
        {showPoster && (
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
        {showVideo && (
          <Box position="relative" overflow="hidden" h="100%">
            {/* TODO: Might remove react player and use just iframe */}
            <ReactPlayer src={trailerURL} playing muted width="100%" height="100%" />
          </Box>
        )}

        {isPreviewActive && trailerFetching && (
          <Progress.Root
            value={null}
            position="absolute"
            top={0}
            left={0}
            width="full"
            colorPalette={activePalette}
          >
            <Progress.Track height="2px">
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        )}

        {/* Media Type Badge */}
        {showBadges && (
          <Text {...badgeStyles} top={1} right={1}>
            {isMovie(media) ? "MOVIE" : "TV SHOW"}
          </Text>
        )}

        {/* Rating */}
        {showBadges && (
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
