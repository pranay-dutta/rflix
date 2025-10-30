import Container from "@/components/Container";
import useMovieLists from "@/hooks/useMovieLists";
import useCustomizationStore from "@/store/customizationStore";
import { Box, Button, Flex, HStack, Skeleton } from "@chakra-ui/react";
import { PropsWithChildren, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { GoMute, GoUnmute } from "react-icons/go";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AspectRatioContainer from "./AspectRatioContainer";
import InfoButton from "./InfoButton";
import MovieLanguage from "./MovieLanguage";
import MovieLogo from "./MovieLogo";
import MovieOverview from "./MovieOverview";
import MovieTrailer from "./MovieTrailer";
import Rating from "./Rating";
import ReleaseDate from "./ReleaseDate";
import MovieWatchButton from "./WatchButton";
import useMovieTrailer from "@/hooks/useMovieTrailer";
import { Movie } from "@/interfaces/Movie";
import ms from "ms";

const Hero = () => {
  const { data, isLoading } = useMovieLists("popular");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (isLoading) {
    return (
      <AspectRatioContainer>
        <Skeleton height="100%" width="100%" borderRadius="md" />
      </AspectRatioContainer>
    );
  }

  // Filter out movies without poster or backdrop images
  const movies = data?.pages[0].results.filter(
    (movie) => movie.poster_path && movie.backdrop_path,
  );

  return (
    <>
      <Swiper
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        modules={[Autoplay]}
        autoplay={{ delay: ms("12s"), pauseOnMouseEnter: true }}
        grabCursor
      >
        {movies?.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <MovieTrailerWrapper isActive={index == activeIndex} movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

interface MovieTrailerWrapperProps {
  movie: Movie;
  isActive: boolean;
}

const MovieTrailerWrapper = ({ movie, isActive }: MovieTrailerWrapperProps) => {
  const disableHomepageVideo = useCustomizationStore((s) => s.disableHomepageVideo);
  const { trailers, isLoading } = useMovieTrailer(movie.id);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const hasTrailer =
    !isLoading && !!trailers?.find((trailer) => trailer.type === "Trailer");
  const show = hasTrailer && !disableHomepageVideo;

  return (
    <Box key={movie.id} className="transition-all">
      {/* <Heading>{"has trailer ?" + hasTrailer}</Heading> */}
      <AspectRatioContainer>
        <MovieTrailer movieId={movie.id} isMuted={isMuted} isActive={isActive} />
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
          <DropShadowWrapper show={isMuted}>
            <MovieLogo movieId={movie.id} />
          </DropShadowWrapper>

          {/* Movie Information */}
          <DropShadowWrapper show={isMuted}>
            <HStack filter="contrast(2)" gap={4}>
              <Rating vote_average={movie.vote_average} />
              <ReleaseDate date={movie.release_date} />
              <MovieLanguage language={movie.original_language} />
            </HStack>
          </DropShadowWrapper>

          {/* Movie overview */}
          <DropShadowWrapper show={isMuted}>
            <MovieOverview overview={movie.overview} />
          </DropShadowWrapper>

          {/* Play and Info button */}
          <DropShadowWrapper show={true}>
            <HStack gap={5}>
              <InfoButton
                opacity={isMuted ? 1 : 0.2}
                icon={FaInfoCircle}
                movieId={movie.id}
              >
                More info
              </InfoButton>
              <MovieWatchButton
                opacity={isMuted ? 1 : 0.2}
                movieId={movie.id}
                icon={FaPlay}
              >
                Play Trailer
              </MovieWatchButton>
              {show && (
                <Button
                  bgColor="whiteAlpha.200"
                  color="white"
                  opacity={isMuted ? 1 : 0.2}
                  _hover={{ transform: "scale(1.1)", opacity: 0.9 }}
                  onClick={() => setIsMuted((prev) => !prev)}
                >
                  {isMuted ? <GoMute /> : <GoUnmute />}
                </Button>
              )}
            </HStack>
          </DropShadowWrapper>
        </Flex>
      </Container>

      {/* Bottom overlay that blends with the hero */}
      <div className="absolute bottom-0 z-[1] w-full h-72 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </Box>
  );
};

interface DropShadowWrapperProps extends PropsWithChildren {
  show: boolean;
}

const DropShadowWrapper = ({ children, show }: DropShadowWrapperProps) => {
  return (
    <Box
      transition="all 0.3s"
      transform={`translateY(${show ? "0" : "-20px"})`}
      opacity={show ? 1 : 0}
      className="drop-shadow-2xl/35"
    >
      {children}
    </Box>
  );
};
export default Hero;
