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

const Hero2 = () => {
  const { data: movies } = useMovies(1);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!movies) return null;

  return (
    <Swiper onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}>
      {movies.results.map((movie, index) => {
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

                {/* Movie Informations */}
                <Box className="w-full flex flex-col gap-3 items-center md:items-start absolute bottom-5 left-0 md:bottom-[20%] md:left-[2%]">
                  <Box p={5}><MovieLogo movieId={movie.id} /></Box>
                  <HStack gap={4}>
                    <Rating rating={movie.vote_average} />
                    <ReleaseDate date={movie.release_date} />
                    <MovieLanguage language={movie.original_language} />
                  </HStack>
                  <MovieOverview overview={movie.overview} />
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
