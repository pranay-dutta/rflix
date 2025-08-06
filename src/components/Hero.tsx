import { Box, HStack } from "@chakra-ui/react";
import { memo, PropsWithChildren, useState } from "react";
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
import { GoUnmute } from "react-icons/go";
import { GoMute } from "react-icons/go";
import useCustomizationStore from "@/store/customizationStore";

const Hero = () => {
  const { data: movies } = useMovieLists("popular");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const disableHomepageVideo = useCustomizationStore((s) => s.disableHomepageVideo);

  if (!movies) return null;
  return (
    <Swiper
      onSlideChange={(swiper) => {
        setActiveIndex(swiper.activeIndex);
        setIsMuted(true);
      }}
      autoplay={{ delay: 30 * 1000 }}
      modules={[Autoplay]}
      grabCursor
    >
      {movies.pages[0].results.map((movie, index) => {
        return (
          <div className="relative">
            <SwiperSlide key={movie.id} className="transition-all relative ">
              <AspectRatioContainer>
                <MovieTrailer
                  movieId={movie.id}
                  isMuted={isMuted}
                  isActive={activeIndex === index}
                />
              </AspectRatioContainer>
              {!disableHomepageVideo && (
                <Box
                  position="absolute"
                  color="whiteAlpha.700"
                  zIndex={20}
                  right={20}
                  bottom={180}
                  cursor="pointer"
                  onClick={() => setIsMuted((prev) => !prev)}
                >
                  {isMuted ? <GoMute size={50} /> : <GoUnmute size={50} />}
                </Box>
              )}

              {/* Bottom shadow over hero component */}
              <div className="absolute h-40 top-10/12 inset-0 bg-gradient-to-b from-transparent via-transparent to-black/100" />
              <Box
                fontSize="lg"
                className="w-full !px-5 flex flex-col gap-3 items-center md:items-start absolute bottom-5 left-0 md:bottom-[20%] md:left-[1%]"
              >
                {/* Movie title logo */}
                <DropShadowWrapper>
                  <MovieLogo movieId={movie.id} />
                </DropShadowWrapper>

                {/* Movie Information */}
                <DropShadowWrapper>
                  <HStack filter="contrast(2)" gap={4}>
                    <Rating vote_average={movie.vote_average} />
                    <ReleaseDate date={movie.release_date} />
                    <MovieLanguage language={movie.original_language} />
                  </HStack>
                </DropShadowWrapper>

                {/* Movie overview */}
                <DropShadowWrapper>
                  <MovieOverview overview={movie.overview} />
                </DropShadowWrapper>

                {/* Play and Info button */}
                <DropShadowWrapper>
                  <HStack gap={5}>
                    <InfoButton icon={FaInfoCircle} id={movie.id}>
                      More info
                    </InfoButton>
                    <MovieWatchButton id={movie.id} icon={FaPlay}>
                      Play Trailer
                    </MovieWatchButton>
                  </HStack>
                </DropShadowWrapper>
              </Box>
            </SwiperSlide>
          </div>
        );
      })}
    </Swiper>
  );
};

const DropShadowWrapper = ({ children }: PropsWithChildren) => {
  return <div className="drop-shadow-2xl/35">{children}</div>;
};
export default memo(Hero);
