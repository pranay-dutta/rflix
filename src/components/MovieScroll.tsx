import useMovies from "@/hooks/useMovies";
import { Box, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getTMDBImage } from "./constants";

const MovieScroll = ({
  endpoint,
}: {
  endpoint: "popular" | "top_rated" | "upcoming" | "now_playing";
}) => {
  const { movies } = useMovies(1, endpoint);
  if (!movies) return null;

  return (
    <Swiper slidesPerView={9} spaceBetween={10} loop>
      {movies.map((movie) => (
        <SwiperSlide>
          <Box
            py={3}
            _hover={{ scale: 1.05 }}
            transition="all 0.3s ease-in-out"
          >
            <Image
              borderRadius="md"
              src={getTMDBImage(movie.poster_path, "w500")}
              alt={movie.original_title}
              objectFit="cover"
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MovieScroll;
