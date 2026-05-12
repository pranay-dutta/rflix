import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import useCustomizationStore from "@/store/customizationStore";
import isMovie from "@/utils/isMovie";
import withAlpha from "@/utils/withAlpha";
import { Box, Container, Flex, HStack, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FaInfoCircle, FaPlay } from "react-icons/fa";
import { GoMute, GoUnmute } from "react-icons/go";
import AspectRatioContainer from "../AspectRatioContainer";
import InfoButton from "../InfoButton";
import MediaSummary from "../MediaSummary";
import MediaTitle from "../MediaTitle";
import HeroImageVideo from "./HeroImageVideo";
import MovieLanguage from "../MovieLanguage";
import Rating from "../Rating";
import ReleaseDate from "../ReleaseDate";
import WatchTrailerButton from "../WatchTrailerButton";
import HeroItemShadowWrapper from "./HeroItemShadowWrapper";

interface MovieTrailerWrapperProps {
  media: Movie | TvSeries;
  isActive: boolean;
}

const HeroImageOverlay = ({ media, isActive }: MovieTrailerWrapperProps) => {
  const activePalette = useCustomizationStore((s) => s.activePalette);
  const disableHomepageVideo = useCustomizationStore((s) => s.disableHomepageVideo);

  const [isMuted, setIsMuted] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const showMuteUnmuteButton = showButton && !disableHomepageVideo && isActive;

  const handleShowButton = (show: boolean) => {
    setShowButton(show);
  };

  // if homepage video is not disabled and slide is active
  return (
    <Box key={media.id} className="transition-all">
      <AspectRatioContainer>
        <HeroImageVideo
          media={media}
          isMuted={isMuted}
          handleShowButton={handleShowButton}
          isActive={isActive}
        />
      </AspectRatioContainer>

      <Container
        fontSize="xs"
        position="absolute"
        left="50%"
        zIndex={20}
        transform={"translateX(-50%)"}
        className="flex gap-3 bottom-5 md:bottom-[25%]"
      >
        <Flex direction="column" minW="full" gap={3}>
          {/* Movie title logo */}
          <HeroItemShadowWrapper show={isMuted}>
            <MediaTitle media={media} />
          </HeroItemShadowWrapper>

          {/* Movie Information */}
          <HeroItemShadowWrapper show={isMuted}>
            <HStack filter="contrast(2)" gap={4}>
              <Rating vote_average={media.vote_average} />
              <ReleaseDate
                date={isMovie(media) ? media.release_date : media.first_air_date}
              />
              <MovieLanguage language={media.original_language} />
            </HStack>
          </HeroItemShadowWrapper>

          {/* Movie overview */}
          <HeroItemShadowWrapper show={isMuted}>
            <MediaSummary overview={media.overview} />
          </HeroItemShadowWrapper>

          <HeroItemShadowWrapper show={true}>
            <HStack gap={5} mt={5}>
              {/*  Watch trailer button*/}
              <WatchTrailerButton
                mediaId={media.id}
                mediaType={isMovie(media) ? "movie" : "tv"}
                icon={FaPlay}
                opacity={isMuted ? 1 : 0.2}
              >
                Play Trailer
              </WatchTrailerButton>

              {/* Info button */}
              <InfoButton
                opacity={isMuted ? 1 : 0.2}
                icon={FaInfoCircle}
                mediaId={media.id}
                mediaType={isMovie(media) ? "movie" : "tv"}
              >
                More info
              </InfoButton>

              {/* Mute/Unmute button */}
              {showMuteUnmuteButton && (
                <IconButton
                  color="white"
                  size="xl"
                  rounded="full"
                  backgroundColor="transparent"
                  transition="all 0.2s ease-in-out"
                  opacity={isMuted ? 1 : 0.5}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  _hover={{
                    borderColor: `${activePalette}.800`,
                    boxShadow: `0px 0px 30px 1px ${withAlpha(activePalette, 0.3)}`,
                  }}
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <GoMute /> : <GoUnmute />}
                </IconButton>
              )}
            </HStack>
          </HeroItemShadowWrapper>
        </Flex>
      </Container>

      {/* bottom overlay that blends with the hero */}
      {/* use two overlay to increase intensity */}
      <div className="absolute bottom-0 z-[1] w-full h-4/6 bg-gradient-to-t from-[var(--background)] to-transparent" />
      <div className="absolute bottom-0 z-[1] w-full h-4/6 bg-gradient-to-t from-[var(--background)] to-transparent" />

      {/* top overlay that blends with the hero */}
      <div className="absolute top-0 z-[1] w-full h-72 bg-gradient-to-b from-[var(--background)] to-transparent" />

      {/* left overlay that blends with the hero */}
      <div className="absolute top-0 left-0 z-[1] h-full w-1/2 bg-gradient-to-r from-[var(--background)]/90 to-transparent" />

      {/* right overlay that blends with the hero */}
      <div className="absolute top-0 right-0 z-[1] h-full w-72 bg-gradient-to-l from-[var(--background)]/70 to-transparent" />
    </Box>
  );
};

export default HeroImageOverlay;
