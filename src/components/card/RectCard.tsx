import useRectPoster from "@/hooks/useRectPoster";
import useTrailer from "@/hooks/useTrailer";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import isMovie from "@/utils/isMovie";
import {
  Blockquote,
  Box,
  Button,
  HStack,
  Image,
  Progress,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { useRef } from "react";
import useCustomizationStore from "@/store/customizationStore";
import getPosterURL from "@/utils/getPosterURL";
import { GoMute, GoUnmute } from "react-icons/go";

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

  const {
    data: trailerURL,
    isFetching: trailerFetching,
    fetchStatus,
  } = useTrailer(mediaType, isPreviewActive, imdbId);

  const navigate = useNavigate();
  const titleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [showTitle, setShowTitle] = useState(false);

  const showPoster = !isPreviewActive || trailerFetching || !trailerURL;
  const showBadges = fetchStatus === "idle" && !isPreviewActive;
  const showVideo = isPreviewActive && trailerURL;

  // When the mouse enters after 1 second show the preview of video
  const handlePointerEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setIsPreviewActive(true);
    }, 1000);
  };

  //title shown timer handler when hovering the card, it will show after 0.5s
  if (showVideo) {
    titleTimer.current = setTimeout(() => {
      setShowTitle(true);
    }, 700);
  }

  // When the mouse leaves clear the timer and hide the preview of video
  const handlePointerLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }

    //clear title timer and hide title when mouse leaves
    if (titleTimer.current) {
      clearTimeout(titleTimer.current);
      titleTimer.current = null;
    }

    //hide title immediately when mouse leaves
    setShowTitle(false);

    //show video preview when mouse leaves
    setIsPreviewActive(false);
  };

  const [isMuted, setMuted] = useState(true);

  // Mute and unmute handler
  const toggleMute = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the click from propagating to the card
    setMuted((prev) => !prev);
  };

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
        {/* image poster of the media */}
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
          <video
            src={trailerURL}
            muted={isMuted}
            loop
            autoPlay
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              display: "block",
            }}
          />
        )}
        {/* Mute/Unmute Button when video trailer is playing */}
        {showVideo && (
          <Button
            top={2}
            right={1}
            {...badgeStyles}
            borderRadius="full"
            onClick={(e) => toggleMute(e)}
            size="xs"
          >
            {isMuted ? <GoMute /> : <GoUnmute />}
          </Button>
        )}

        {/* Title flowing from left bottom */}
        <Box
          position="absolute"
          bottom={4}
          left={showVideo ? 0 : -20}
          px={2}
          py={1}
          bg="blackAlpha.600"
          opacity={showVideo ? 1 : 0}
          transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          borderRadius="sm"
        >
          <Blockquote.Root colorPalette={activePalette} variant="solid">
            <Blockquote.Content>
              <Text
                fontSize="md"
                fontWeight="semibold"
                opacity={showTitle ? 1 : 0}
                transition="all 0.3s ease-in-out"
              >
                {isMovie(media) ? media.title : media.name}
              </Text>
            </Blockquote.Content>
          </Blockquote.Root>
        </Box>

        {/* Loading progress bar when video is fetching */}
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
