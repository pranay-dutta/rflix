import useRectPoster from "@/hooks/useRectPoster";
import useTrailer from "@/hooks/useTrailer";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import isMovie from "@/utils/isMovie";
import { Box, HStack, Image, Progress, Skeleton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { useRef } from "react";
import useCustomizationStore from "@/store/customizationStore";
import getPosterURL from "@/utils/getPosterURL";

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
//TODO: do a clean up if possible
const RectCard = ({ media }: Props) => {
  const mediaType = isMovie(media) ? "movie" : "tv";
  const activePalette = useCustomizationStore((s) => s.activePalette);

  const [imgLoading, setImgLoading] = useState(true);
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  const { data: posterAndExternalIds, isLoading } = useRectPoster(media.id, mediaType);
  const imdbId = posterAndExternalIds?.external_ids.imdb_id;
  const posterPath = getPosterURL(isLoading, posterAndExternalIds);

  //Video Trailer
  const {
    data: trailerURL,
    isFetching: trailerFetching,
    fetchStatus,
  } = useTrailer(mediaType, isPreviewActive, imdbId);

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
        overflow="hidden"
      >
        {showPoster && (
          <Image
            onLoad={() => setImgLoading(false)}
            src={posterPath}
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
          <Box position="absolute" top={0} left={0} w="full" h="full">
            <video
              src={trailerURL}
              muted
              loop
              autoPlay
              width="100%"
              height="100%"
              className="object-cover"
            />
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
        <Text
          {...badgeStyles}
          right={1}
          top={1}
          opacity={showBadges ? 1 : 0}
          scale={showBadges ? 1 : 0}
          transition="all 0.3s fade-out"
          pointerEvents={showBadges ? "auto" : "none"}
        >
          {isMovie(media) ? "MOVIE" : "TV SHOW"}
        </Text>

        {/* Rating */}
        <HStack
          {...badgeStyles}
          gap={1}
          left={1}
          top={1}
          opacity={showBadges ? 1 : 0}
          scale={showBadges ? 1 : 0}
          transition="all 0.3s fade-out"
          pointerEvents={showBadges ? "auto" : "none"}
          fontSize="x-small"
        >
          <FaStar color="orange" />
          {media.vote_average.toFixed(1)}
        </HStack>
      </Box>
    </Skeleton>
  );
};

export default RectCard;
