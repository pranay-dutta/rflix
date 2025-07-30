import { getTMDBImage } from "./constants";
import { Image } from "@chakra-ui/react";
import useMovie from "@/hooks/useMovie";

const MovieBackdropImage = ({ movieId }: { movieId: number }) => {
  const { movie } = useMovie(movieId);
  if (!movie) return;

  return (
    <Image
      className="opacity-70 w-full object-cover"
      src={getTMDBImage(movie?.backdrop_path, "original", "horizontal")}
      alt={movie.original_title}
      w="100%"
      h="100%"
      loading="lazy"
    />
  );
};

export default MovieBackdropImage;