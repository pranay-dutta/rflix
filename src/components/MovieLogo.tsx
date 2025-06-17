import useMovie from "@/hooks/useMovie";
import { Image, Text } from "@chakra-ui/react";
import { getTMDBImage } from "./constants";
import useLogoImages from "@/hooks/useLogoImages";

const MovieLogo = ({ movieId }: { movieId: number }) => {
  const { logoImages } = useLogoImages(movieId);
  const { movie } = useMovie(movieId);

  if (!logoImages || !logoImages.logos.length)
    return (
      <Text className="!text-4xl md:!text-7xl !font-medium">{movie?.original_title}</Text>
    );

  const logo =
    logoImages.logos.find((logo) => logo.iso_639_1 === "en") || logoImages.logos[0];

  return <Image src={getTMDBImage(logo.file_path, "w500")} alt={movie?.original_title} />;
};

export default MovieLogo;
