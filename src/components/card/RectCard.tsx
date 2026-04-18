import useRectPoster from "@/hooks/useRectPoster";
import useTrailer from "@/hooks/useTrailer";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import useCustomizationStore from "@/store/customizationStore";
import getPosterURL from "@/utils/getPosterURL";
import isMovie from "@/utils/isMovie";
import {
  Blockquote,
  Box,
  IconButton,
  Image,
  Progress,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { GoMute, GoUnmute } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Rating from "../Rating";

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
  const [showBox, setShowBox] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const showPoster = !isPreviewActive || trailerFetching || !trailerURL;
  const showBadges = fetchStatus === "idle" && !isPreviewActive;
  const showVideo = isPreviewActive && trailerURL;

  // When the mouse enters after 1 second show the preview of video
  const handlePointerEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setIsPreviewActive(true);
    }, 1000);
  };

  //title shown timer handler when hovering the card, it will show after 0.7s
  useEffect(() => {
    //if video url is not present don't show the overlay box and title
    if (!showVideo) {
      setShowBox(false);
      setShowTitle(false);
      return;
    }
    if (!videoLoaded) return;

    // Show overlay box immediately when video starts
    setShowBox(true);

    // Show title after 1000ms
    const showTimer = setTimeout(() => {
      setShowTitle(true);
    }, 1500);

    //hide the overlay box and title after (7-3) = 4 seconds
    const hideTimer = setTimeout(() => {
      setShowBox(false);
      setShowTitle(false);
    }, 7000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);

      //reset the hide timer
      if (titleTimer.current) {
        clearTimeout(titleTimer.current);
        titleTimer.current = null;
      }
    };
  }, [showVideo, videoLoaded]);

  // When the mouse leaves clear the timer and hide the preview of video
  const handlePointerLeave = () => {
    //clear hover timer when mouse leaves
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }

    //clear title timer and hide title when mouse leaves
    if (titleTimer.current) {
      clearTimeout(titleTimer.current);
      titleTimer.current = null;
    }

    //hide title and box immediately when mouse leaves
    setShowTitle(false);
    setShowBox(false);

    //hide video preview when mouse leaves
    setIsPreviewActive(false);
  };

  const [isMuted, setMuted] = useState(true);

  // Mute and unmute handler
  const toggleMute = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the click from propagating to the card
    setMuted((prev) => !prev);
  };

  //show the title overlay when video has url and is loaded
  const showOverlay = showBox && videoLoaded;

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
            onLoadedData={() => setVideoLoaded(true)}
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
          <IconButton
            aria-label="Toggle mute"
            top={1}
            right={1}
            position="absolute"
            bg="blackAlpha.600"
            borderRadius="full"
            size="xs"
            onClick={toggleMute}
            color="white"
          >
            {isMuted ? <GoMute /> : <GoUnmute />}
          </IconButton>
        )}

        {/*black overlay under title flowing from left bottom */}
        <Box
          position="absolute"
          borderRadius="sm"
          px={2}
          py={1}
          bg="blackAlpha.600"
          bottom={4}
          left={showOverlay ? 0 : -20}
          opacity={showOverlay ? 1 : 0}
          transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          {/* The actual title content which appears after */}
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
        <Rating
          {...badgeStyles}
          gap={1}
          left={1}
          top={1}
          opacity={showBadges ? 1 : 0}
          scale={showBadges ? 1 : 0}
          transition="all 0.3s fade-out"
          pointerEvents={showBadges ? "auto" : "none"}
          fontSize="x-small"
          vote_average={media.vote_average}
        />
      </Box>
    </Skeleton>
  );
};

export default RectCard;
