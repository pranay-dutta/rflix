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
import useMovieLists from "@/hooks/useMovieLists";


const Hero = () => {
  const { data: movies } = useMovieLists("popular");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!movies) return null;

  return (
    <Swiper
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      autoplay={{ delay: 30 * 1000 }}
      modules={[Autoplay]}
      grabCursor
    >
      {movies.pages[0].results.map((movie, index) => {
        return (
          <div className="relative">
            <SwiperSlide key={movie.id} className="transition-all relative">
              <AspectRatioContainer>
                <MovieTrailer movieId={movie.id} isActive={activeIndex === index} />
              </AspectRatioContainer>

              {/* Bottom shadow over hero component */}
              <div className="absolute h-40 top-10/12 inset-0 bg-gradient-to-b from-transparent via-transparent to-black/100" />
              <Box
                fontSize="lg"
                className="w-full !px-5 flex flex-col gap-3 items-center md:items-start absolute bottom-5 left-0 md:bottom-[20%] md:left-[1%]"
              >
                {/* Movie title logo */}
                <Box maxH={300} maxW={350} >
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
        );
      })}

    </Swiper>
  );
};

export default Hero;