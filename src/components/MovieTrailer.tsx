import useMovie from "@/hooks/useMovie";
import useTrailers from "@/hooks/useTrailers";
import { useEffect, useRef } from "react";
import MovieBackdropImage from "./MovieBackdropImage";

interface Props {
  isActive: boolean;
  movieId: number;
}

const MovieTrailer = ({ movieId, isActive = false }: Props) => {
  const { trailers } = useTrailers(movieId);
  const { movie } = useMovie(movieId);
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
      "*"
    );
  }, [isActive]);

  const youtubeId = trailers?.find(
    (trailer) => trailer.type === "Trailer"
  )?.key;

  if (!youtubeId || window.innerWidth < 1024)
    return <MovieBackdropImage movieId={movieId} />;

  return (
    <iframe
      className="opacity-60 top-[2%]!" //top 2% hides the related videos below
      ref={iframeRef}
      src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&mute=1&autoplay=1&loop=1&rel=0&fs=0&controls=0&disablekb=1&playlist=${youtubeId}`}
      style={{ scale: 1.5 }}
      title={movie?.original_title}
      allowFullScreen
      loading="lazy"
    />
  );
};

export default MovieTrailer;
