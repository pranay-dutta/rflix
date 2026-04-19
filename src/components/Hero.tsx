import Container from "@/components/Container";
import useTrending from "@/hooks/useTrending";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import isMovie from "@/utils/isMovie";
import { Box, Flex, HStack, IconButton, Skeleton } from "@chakra-ui/react";
import ms from "ms";
import { PropsWithChildren, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { GoMute, GoUnmute } from "react-icons/go";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AspectRatioContainer from "./AspectRatioContainer";
import InfoButton from "./InfoButton";
import MovieSummary from "./MediaSummary";
import MovieTitle from "./MediaTitle";
import MediaTrailer from "./MediaTrailer";
import MovieLanguage from "./MovieLanguage";
import Rating from "./Rating";
import ReleaseDate from "./ReleaseDate";
import WatchTrailerButton from "./WatchTrailerButton";
import useCustomizationStore from "@/store/customizationStore";
import withAlpha from "@/utils/withAlpha";

const filterMedia = (item: Movie | TvSeries) => {
  if (item.vote_count < 100) return false; // filter out media with low vote count to ensure quality
  return item.media_type === "movie" || item.media_type === "tv";
};

const Hero = () => {
  const { data, isLoading } = useTrending("all", "day", true);
  const filteredData = data?.results.filter(filterMedia) || [];

  if (isLoading) {
    return (
      <AspectRatioContainer>
        <>
          <Skeleton height="100%" width="100%" borderRadius="md" />
          {/* Bottom overlay that blends with the hero */}
          <div className="absolute bottom-0 z-[1] w-full h-72 bg-gradient-to-t from-[var(--background)] to-transparent" />
        </>
      </AspectRatioContainer>
    );
  }

  return (
    <>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: ms("12s"), pauseOnMouseEnter: true }}
        grabCursor
        watchSlidesProgress
      >
        {filteredData.map((media) => (
          <SwiperSlide key={media.id}>
            {({ isActive }) => <HeroImage isActive={isActive} media={media} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

interface MovieTrailerWrapperProps {
  media: Movie | TvSeries;
  isActive: boolean;
}

const HeroImage = ({ media, isActive }: MovieTrailerWrapperProps) => {
  const activePalette = useCustomizationStore((s) => s.activePalette);
  const disableHomepageVideo = useCustomizationStore((s) => s.disableHomepageVideo);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // if homepage video is not disabled and trailer is playing show the mute/unmute button
  const showMuteUnmuteButton = isPlaying && !disableHomepageVideo;

  //callback function to show the mute/unmute button when the video starts playing
  const handlePlaying = (playing: boolean) => setIsPlaying(playing);

  return (
    <Box key={media.id} className="transition-all">
      <AspectRatioContainer>
        <MediaTrailer
          handlePlaying={handlePlaying}
          media={media}
          isMuted={isMuted}
          isActive={isActive}
        />
      </AspectRatioContainer>

      <Container
        fontSize="xs"
        position="absolute"
        left="50%"
        zIndex={20}
        transform={"translateX(-50%)"}
        className="flex gap-3 bottom-5 md:bottom-[20%]"
      >
        <Flex direction="column" minW="full" gap={6}>
          {/* Movie title logo */}
          <DropShadowWrapper show={isMuted}>
            <MovieTitle media={media} />
          </DropShadowWrapper>

          {/* Movie Information */}
          <DropShadowWrapper show={isMuted}>
            <HStack filter="contrast(2)" gap={4}>
              <Rating vote_average={media.vote_average} />
              <ReleaseDate
                date={isMovie(media) ? media.release_date : media.first_air_date}
              />
              <MovieLanguage language={media.original_language} />
            </HStack>
          </DropShadowWrapper>

          {/* Movie overview */}
          <DropShadowWrapper show={isMuted}>
            <MovieSummary overview={media.overview} />
          </DropShadowWrapper>

          {/* Info button */}
          <DropShadowWrapper show={true}>
            <HStack gap={5}>
              <InfoButton
                opacity={isMuted ? 1 : 0.2}
                icon={FaInfoCircle}
                mediaId={media.id}
                mediaType={isMovie(media) ? "movie" : "tv"}
              >
                More info
              </InfoButton>

              {/*  Watch trailer button*/}
              <WatchTrailerButton
                mediaId={media.id}
                mediaType={isMovie(media) ? "movie" : "tv"}
                icon={FaPlay}
                opacity={isMuted ? 1 : 0.2}
              >
                Play Trailer
              </WatchTrailerButton>

              {/* Mute/Unmute button */}
              <IconButton
                color="white"
                size="xl"
                rounded="full"
                backgroundColor="transparent"
                transition="all 0.2s ease-in-out"
                opacity={showMuteUnmuteButton ? (isMuted ? 1 : 0.5) : 0}
                _hover={{
                  borderColor: `${activePalette}.800`,
                  boxShadow: `0px 0px 30px 1px ${withAlpha(activePalette, 0.3)}`,
                }}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <GoMute /> : <GoUnmute />}
              </IconButton>
            </HStack>
          </DropShadowWrapper>
        </Flex>
      </Container>

      {/* bottom overlay that blends with the hero */}
      <div className="absolute bottom-0 z-[1] w-full h-4/6 bg-gradient-to-t from-[var(--background)] to-transparent" />
      <div className="absolute bottom-0 z-[1] w-full h-4/6 bg-gradient-to-t from-[var(--background)] to-transparent" />

      {/* top overlay that blends with the hero */}
      <div className="absolute top-0 z-[1] w-full h-96 bg-gradient-to-b from-[var(--background)] to-transparent" />

      {/* left overlay that blends with the hero */}
      <div className="absolute top-0 left-0 z-[1] h-full w-72 bg-gradient-to-r from-[var(--background)]/40 to-transparent" />

      {/* right overlay that blends with the hero */}
      <div className="absolute top-0 right-0 z-[1] h-full w-72 bg-gradient-to-l from-[var(--background)]/40 to-transparent" />
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
