import useMovieTrailer from "@/hooks/useMovieTrailer";
import { useEffect, useRef } from "react";
import MovieBackdropImage from "./MovieBackdropImage";
import { Skeleton } from "@chakra-ui/react";
import useCustomizationStore from "@/store/customizationStore";

interface Props {
  isActive: boolean;
  movieId: number;
  isMuted?: boolean;
}

const MovieTrailer = ({ movieId, isActive, isMuted }: Props) => {
  const { trailers, isLoading } = useMovieTrailer(movieId);
  const disableHomepageVideo = useCustomizationStore((s) => s.disableHomepageVideo);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // ▶️ Play or ⏸ Pause depending on isActive
  useEffect(() => {
    if (!iframeRef.current) return;

    const commands = [
      {
        event: "command",
        func: isActive ? "playVideo" : "pauseVideo",
        args: [],
      },
      {
        event: "command",
        func: isMuted ? "mute" : "unMute",
        args: [],
      },
    ];

    commands.forEach((cmd) => {
      iframeRef.current!.contentWindow?.postMessage(JSON.stringify(cmd), "*");
    });
  }, [isActive, isMuted]);

  const youtubeId = trailers?.find((trailer) => trailer.type === "Trailer")?.key;

  if (isLoading) return <Skeleton width="100%" height="100%" />;
  if (!youtubeId || window.innerWidth < 1024 || disableHomepageVideo)
    return <MovieBackdropImage movieId={movieId} />;

  return (
    <iframe
      className="opacity-80 top-[2%]!" //top 2% hides the related videos below
      ref={iframeRef}
      src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&mute=1&autoplay=1&loop=1&rel=0&fs=0&controls=0&disablekb=1&playlist=${youtubeId}`}
      allow="autoplay; encrypted-media"
      title="YouTube video player"
      style={{ scale: 1.5 }}
      allowFullScreen
      loading="lazy"
    />
  );
};

export default MovieTrailer;
