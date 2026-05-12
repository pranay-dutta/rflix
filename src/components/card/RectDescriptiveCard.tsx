import useRectPoster from "@/hooks/useRectPoster";
import useTrailer from "@/hooks/useTrailer";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import useCustomizationStore from "@/store/customizationStore";
import getPosterURL from "@/utils/getPosterURL";
import isMovie from "@/utils/isMovie";
import { Box, IconButton, Image, Progress } from "@chakra-ui/react";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { GoMute, GoUnmute } from "react-icons/go";
import Skeleton from "../skeleton/Skeleton";
import useCardNavigation from "@/hooks/useCardNavigation";

interface Props {
  media: Movie | TvSeries;
}

//TODO: do a clean up if possible
const RectDescriptiveCard = ({ media }: Props) => {
  const mediaType = isMovie(media) ? "movie" : "tv";
  const activePalette = useCustomizationStore((s) => s.activePalette);

  const [isPreviewActive, setIsPreviewActive] = useState(false);

  const { data: posterAndExternalIds, isLoading: posterFetching } = useRectPoster(
    media.id,
    mediaType,
  );
  const imdbId = posterAndExternalIds?.external_ids.imdb_id;
  const posterPath = getPosterURL(posterFetching, posterAndExternalIds);

  const { data: trailerURL, isFetching: trailerFetching } = useTrailer(
    mediaType,
    isPreviewActive,
    imdbId,
    "480p",
  );

  const titleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);

  const showPoster = !isPreviewActive || trailerFetching || !trailerURL;
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
    if (!videoLoaded) return;

    return () => {
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

    //hide video preview when mouse leaves
    setIsPreviewActive(false);

    //reset video loaded state when mouse leaves
    setVideoLoaded(false);
  };

  const [isMuted, setMuted] = useState(true);
  const { handleCardClick } = useCardNavigation();

  // Mute and unmute handler
  const toggleMute = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the click from propagating to the card
    setMuted((prev) => !prev);
  };

  return (
    <Skeleton loading={posterFetching} overflow="hidden" borderRadius="sm">
      <Box
        position="relative"
        aspectRatio={16 / 9}
        cursor="pointer"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={() => handleCardClick(media)}
      >
        {/* image poster of the media */}
        {showPoster && (
          <Image
            src={posterPath}
            _hover={{ transform: "scale(1.07)" }}
            transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            willChange="scale"
            loading="lazy"
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
      </Box>
    </Skeleton>
  );
};

export default RectDescriptiveCard;
