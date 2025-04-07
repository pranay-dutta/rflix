import useVideos from "@/hooks/useVideos";
import { AspectRatio } from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  isActive: boolean;
  movieId: number;
}

const MovieVideo = ({ movieId, isActive = false }: Props) => {
  const { videos } = useVideos(movieId);
  const videoRef = useRef(null);

  if (!videos) return null;
  const youtubeId = videos.find((video) => video.type === "Trailer")?.key;

  return (
    <AspectRatio w="svw" h="svh" zIndex="-1" overflow="hidden">
      <iframe
        ref={videoRef}
        src={`https://www.youtube.com/embed/${youtubeId}?mute=1&autoplay=${isActive}&loop=1&rel=0&fs=0&controls=0&disablekb=1&playlist=${youtubeId}`}
        style={{ scale: 1.3 }}
        allowFullScreen
        loading="lazy"
      />
    </AspectRatio>
  );
};

export default MovieVideo;