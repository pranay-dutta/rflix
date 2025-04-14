import { getPlaceHolder, getTMDBImage } from "./constants";
import { Image } from "@chakra-ui/react";
import useMovie from "@/hooks/useMovie";

const MovieBackdropImage = ({ movieId }: { movieId: number }) => {
  const { movie } = useMovie(movieId);
  if (!movie) return;

  return (
    <Image
      className="opacity-40"
      src={
        movie.backdrop_path
          ? getTMDBImage(movie?.backdrop_path, "original")
          : getPlaceHolder("original")
      }
      alt={movie.original_title}
    />
  );
};

export default MovieBackdropImage;
