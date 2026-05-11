import isMovie from "@/utils/isMovie";
import { Text, Box, Flex, Span } from "@chakra-ui/react";
import Rating from "../Rating";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import useCardNavigation from "@/hooks/useCardNavigation";

interface Props {
  isLoading: boolean;
  media?: Movie | TvSeries;
}
const Description = ({ isLoading, media }: Props) => {
  const { handleCardClick } = useCardNavigation();
  const date = media
    ? isMovie(media)
      ? media.release_date
      : media.first_air_date
    : "1900-01-01";
  const showTemplate = isLoading || !media;

  const opacity = showTemplate ? 0.2 : 1;

  return (
    <Box onClick={() => handleCardClick(media)}>
      <Text mt={2} fontSize="13px" fontWeight="semibold" opacity={opacity} lineClamp={1}>
        {showTemplate ? "Loading" : isMovie(media) ? media.title : media.name}
      </Text>
      <Flex mt={1} fontSize="11px" gap={2} color="gray.400" opacity={opacity}>
        <Rating vote_average={showTemplate ? 0 : media.vote_average} color="gray.400" />
        <Span opacity="0.5">•</Span>
        <Box>{date.slice(0, 4)}</Box>
        <Span opacity="0.5">•</Span>
        <Box>{showTemplate ? "Media" : isMovie(media) ? "Movie" : "TV Show"}</Box>
      </Flex>
    </Box>
  );
};

export default Description;
