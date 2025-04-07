import useImages from "@/hooks/useImages";
import useMovie from "@/hooks/useMovie";
import { Image } from "@chakra-ui/react";

const SwiperSlideChild = ({ movieId }: { movieId: number }) => {
  const { images, isLoading } = useImages(movieId);
  const { movie } = useMovie(movieId);

  if (!images || isLoading) return null;

  let logo = images.logos.find((logo) => logo.iso_639_1 === "en")?.file_path;
  if (!logo) logo = images.logos.length > 0 ? images.logos[0].file_path : "";

  return (
    <div>
      <Image
        src={`https://image.tmdb.org/t/p/w500${logo}`}
        className="!text-4xl md:!text-7xl"
        alt={movie?.original_title}
      />
      {images.id}
      <p>{logo}</p>
    </div>
  );
};

export default SwiperSlideChild;
