import useRectPoster from "@/hooks/useRectPoster";
import useTrailer from "@/hooks/useTrailer";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import useCustomizationStore from "@/store/customizationStore";
import isMovie from "@/utils/isMovie";
import { Box, Skeleton } from "@chakra-ui/react";
import MediaBackdropImage from "./MediaBackdropImage";
import { useEffect, useRef } from "react";

interface Props {
  isActive: boolean;
  media: Movie | TvSeries;
  isMuted?: boolean;
  handlePlaying: (isPlaying: boolean) => void;
}

const MediaTrailer = ({ media, isActive, isMuted, handlePlaying }: Props) => {
  const mediaType = isMovie(media) ? "movie" : "tv";
  const { data: posterAndExternalIds, isLoading } = useRectPoster(media.id, mediaType);

  const disableHomepageVideo = useCustomizationStore((s) => s.disableHomepageVideo);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imdbId = posterAndExternalIds?.external_ids.imdb_id;

  //fetch the trailer from backend using the imdb id
  const fetchTrailer = isActive && !disableHomepageVideo;
  const { data: trailerURL, isFetching: trailerFetching } = useTrailer(
    mediaType,
    fetchTrailer,
    imdbId,
    "1080p",
  );

  useEffect(() => {
    const handlePlay = async () => {
      //if video ref is null do nothing
      const video = videoRef.current;
      if (!video) return;

      //play the video if the slide is active and pause it if it's not
      if (isActive && video.paused) {
        await video.play();
      } else {
        video.pause();
      }
    };
    handlePlay();
  }, [isActive]);

  // if trailer is loading show skeleton
  if (isLoading || trailerFetching)
    return <Skeleton variant="shine" width="100%" height="100%" />;

  //if there is no trailer or homepage video is disabled show backdrop image
  if (disableHomepageVideo || !trailerURL || window.innerWidth < 768)
    return <MediaBackdropImage path={media.backdrop_path} />;

  return (
    <Box position="relative">
      <video
        ref={videoRef}
        className="absolute inset-0"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        loop
        src={trailerURL}
        muted={isMuted}
        autoPlay={isActive}
        onLoadedData={() => handlePlaying(true)}
        onPause={() => handlePlaying(false)}
      />
    </Box>
  );
};

export default MediaTrailer;
