import useTrailers from "@/hooks/useTrailers";
import { useEffect, useRef } from "react";
import MovieBackdropImage from "./MovieBackdropImage";
import { Skeleton } from "@chakra-ui/react";

interface Props {
  isActive: boolean;
  movieId: number;
}

const MovieTrailer = ({ movieId, isActive = false }: Props) => {
  const { trailers, isLoading } = useTrailers(movieId);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // ▶️ Play or ⏸ Pause depending on isActive
  useEffect(() => {
    if (!iframeRef.current) return;

    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: isActive ? "playVideo" : "pauseVideo",
        args: [],
      }),
      "*",
    );
  }, [isActive]);

  const youtubeId = trailers?.find((trailer) => trailer.type === "Trailer")?.key;

  if (isLoading) return <Skeleton width="100vw" height="100vh" />
  if (!youtubeId || window.innerWidth < 1024)
    return <MovieBackdropImage movieId={movieId} />;

  return (
    <iframe
      className="opacity-70 top-[2%]!" //top 2% hides the related videos below
      ref={iframeRef}
      src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&mute=1&autoplay=1&loop=1&rel=0&fs=0&controls=0&disablekb=1&playlist=${youtubeId}`}
      style={{ scale: 1.5 }}
      allowFullScreen
      loading="lazy"
    />
  );
};

export default MovieTrailer;
