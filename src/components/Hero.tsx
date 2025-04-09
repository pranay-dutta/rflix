import useMovies from "@/hooks/useMovies";
import { Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import AspectRatioContainer from "./AspectRatioContainer";
import MovieLanguage from "./MovieLanguage";
import MovieLogo from "./MovieLogo";
import MovieOverview from "./MovieOverview";
import MovieTrailer from "./MovieTrailer";
import Rating from "./Rating";
import ReleaseDate from "./ReleaseDate";
import Button from "./Button";
import { FaInfoCircle } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";

const Hero2 = () => {
  const { movies } = useMovies(1, "upcoming");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!movies) return null;
  console.log(movies);

  return (
    <Swiper onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}>
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

                <Box className="w-full flex flex-col gap-3 items-center md:items-start absolute bottom-5 left-0 md:bottom-[10%] md:left-[2%]">
                  {/* Movie title logo */}
                  <Box p={5} maxH={500} maxW={500}>
                    <MovieLogo movieId={movie.id} />
                  </Box>

                  {/* Movie Informations */}
                  <HStack gap={4}>
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
