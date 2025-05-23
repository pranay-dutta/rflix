import useMovies from "@/hooks/useMovies";
import { Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AspectRatioContainer from "./AspectRatioContainer";
import MovieLanguage from "./MovieLanguage";
import MovieLogo from "./MovieLogo";
import MovieOverview from "./MovieOverview";
import MovieTrailer from "./MovieTrailer";
import Rating from "./Rating";
import ReleaseDate from "./ReleaseDate";
import InfoButton from "./InfoButton";
import MovieWatchButton from "./WatchButton";

const Hero2 = () => {
  const { movies } = useMovies(1, "popular");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!movies) return null;

  return (
    <Swiper
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      autoplay={{ delay: 30 * 1000 }}
      modules={[Autoplay]}
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
                  fontSize="lg"
                  className="w-full !px-5 flex flex-col gap-3 items-center md:items-start absolute bottom-5 left-0 md:bottom-[25%] md:left-[1%]"
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
                    <InfoButton icon={FaInfoCircle} id={movie.id}>
                      More info
                    </InfoButton>
                    <MovieWatchButton id={movie.id} icon={FaPlay}>
                      Play
                    </MovieWatchButton>
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
