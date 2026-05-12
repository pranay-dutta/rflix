import isMovie from "@/utils/isMovie";
import { Text, Box, Flex, Span } from "@chakra-ui/react";
import Rating from "../Rating";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import useCardNavigation from "@/hooks/useCardNavigation";
import { WatchListItem } from "@/store/watchListStore";

interface Props {
  isLoading: boolean;
  media?: Movie | TvSeries;
  watchListItem?: WatchListItem;
}
const Description = ({ isLoading, media, watchListItem }: Props) => {
  const { handleCardClick } = useCardNavigation();

  const date = media
    ? isMovie(media)
      ? media.release_date
      : media.first_air_date
    : "1900-01-01";

  const title = isLoading
    ? "Loading"
    : (media && isMovie(media) ? media?.title : media?.name) ||
      (watchListItem && watchListItem.title);

  const movie = media && isMovie(media);
  const watchListMovie = watchListItem && watchListItem.mediaType === "movie";
  const mediaType = isLoading
    ? "Loading"
    : movie || watchListMovie
      ? "Movie"
      : "TV Show";

  const rating = isLoading ? 0 : media?.vote_average || watchListItem?.rating || 0;
  const opacity = isLoading ? 0.2 : 1;

  return (
    <Box onClick={() => handleCardClick(media)}>
      <Text mt={2} fontSize="13px" fontWeight="semibold" opacity={opacity} lineClamp={1}>
        {title}
      </Text>
      <Flex mt={1} fontSize="11px" gap={2} color="gray.300" opacity={opacity}>
        <Rating vote_average={rating} color="gray.300" />
        <Span opacity="0.5">•</Span>
        <Box>{date.slice(0, 4)}</Box>
        <Span opacity="0.5">•</Span>
        <Box>{mediaType}</Box>
      </Flex>
    </Box>
  );
};

export default Description;
