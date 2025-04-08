import useImages from "@/hooks/useImages";
import useMovie from "@/hooks/useMovie";
import { Image, Text } from "@chakra-ui/react";
import { getTMDBImage } from "./constants";

const MovieLogo = ({ movieId }: { movieId: number }) => {
  const { images, isLoading } = useImages(movieId);
  const { movie } = useMovie(movieId);

  if (!images || isLoading) return null;

  let logo = images.logos.find((logo) => logo.iso_639_1 === "en")?.file_path;
  if (!logo) logo = images.logos.length > 0 ? images.logos[0].file_path : "";

  if (logo === "")
    return (
      <Text className="!text-4xl md:!text-7xl !font-medium">
        {movie?.original_title}
      </Text>
    );

  return <Image src={getTMDBImage(logo, "w500")} alt={movie?.original_title} />;
};

export default MovieLogo;
