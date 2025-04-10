import useMovies from "@/hooks/useMovies";
import { Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AspectRatioContainer from "./AspectRatioContainer";
import Button from "./Button";
import MovieLanguage from "./MovieLanguage";
import MovieLogo from "./MovieLogo";
import MovieOverview from "./MovieOverview";
import MovieTrailer from "./MovieTrailer";
import Rating from "./Rating";
import ReleaseDate from "./ReleaseDate";

const Hero2 = () => {
  const { movies } = useMovies(1, "popular");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!movies) return null;

  return (
    <Swiper
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      // autoplay={{ delay: 12 * 1000 }}
      // modules={[Autoplay]}
    >
      {movies.map((movie, index) => {
        return (
          <>
            <div className="relative">
              <SwiperSlide key={movie.id} className="transition-all relative">
                <AspectRatioContainer>
                  <MovieTrailer
                    movieId={movie.id}
                    isActive={activeIndex === index}
                  />
                </AspectRatioContainer>

                <Box
                  filter="drop-shadow(0 4px 4px rgba(0, 0, 0, 0.6))"
                  fontSize="lg"
                  className="w-full !px-5 flex flex-col gap-3 items-center md:items-start absolute bottom-5 left-0 md:bottom-[20%] md:left-[2%]"
                >
                  {/* Movie title logo */}
                  <Box maxH={500} maxW={500}>
                    <MovieLogo movieId={movie.id} />
                  </Box>

                  {/* Movie Informations */}
                  <HStack filter="contrast(2)" gap={4}>
                    <Rating rating={movie.vote_average} />
                    <ReleaseDate date={movie.release_date} />
                    <MovieLanguage language={movie.original_language} />
                  </HStack>
                  <MovieOverview overview={movie.overview} />

                  <HStack gap={5}>
                    <Button icon={FaInfoCircle}>More info</Button>
                    <Button icon={FaPlay}>Play</Button>
                  </HStack>
                </Box>
              </SwiperSlide>
            </div>
          </>
        );
      })}
    </Swiper>
  );
};

export default Hero2;
