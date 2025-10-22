import { Box, Button, Flex, HStack } from "@chakra-ui/react";
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
import Container from "@/components/Container";

const Hero = () => {
  const { data: movies } = useMovieLists("popular");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const disableHomepageVideo = useCustomizationStore((s) => s.disableHomepageVideo);

  if (!movies) return null;
  return (
    <Box>
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
            <SwiperSlide key={movie.id} className="transition-all">
              <AspectRatioContainer>
                <MovieTrailer
                  movieId={movie.id}
                  isMuted={isMuted}
                  isActive={activeIndex === index}
                />
              </AspectRatioContainer>

              <Container
                fontSize="lg"
                position="absolute"
                left="50%"
                zIndex={20}
                transform={"translateX(-50%)"}
                className="flex gap-3 bottom-5 md:bottom-[15%]"
              >
                <Flex direction="column" minW="full" gap={6}>
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
                      {!disableHomepageVideo && (
                        <Button
                          bgColor="whiteAlpha.300"
                          color="white"
                          onClick={() => setIsMuted((prev) => !prev)}
                        >
                          {isMuted ? <GoMute /> : <GoUnmute />}
                        </Button>
                      )}
                    </HStack>
                  </DropShadowWrapper>
                </Flex>
              </Container>

              <div className="absolute bottom-0 z-[1] w-full h-72 bg-gradient-to-t from-[var(--background)] to-transparent" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

const DropShadowWrapper = ({ children }: PropsWithChildren) => {
  return <div className="drop-shadow-2xl/35">{children}</div>;
};
export default memo(Hero);
