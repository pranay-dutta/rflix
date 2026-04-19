import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import isMovie from "@/utils/isMovie";
import { Text } from "@chakra-ui/react";

const MediaTitle = ({ media }: { media: Movie | TvSeries }) => {
  // prefer title and name which is english
  const title = isMovie(media) ? media.title : media.name;

  return (
    <Text
      fontSize={{ base: "3xl", md: "5xl" }}
      fontWeight="extrabold"
      lineHeight={1.1}
      maxW="20ch"
    >
      {title.toUpperCase()}
    </Text>
  );
};

export default MediaTitle;
