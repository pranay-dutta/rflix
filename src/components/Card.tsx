import { Movie } from "@/interfaces/Movie";
import { Box, HStack, Image, Text, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { getTMDBImage } from "./constants";
import Rating from "./Rating";
import ReleaseDate from "./ReleaseDate";
import { Link } from "react-router-dom";
import TvSeries from "@/interfaces/TvSeries";
import Gradient from "./Gradient";
import isMovie from "@/utils/isMovie";

interface Props {
  media: Movie | TvSeries;
}

const Card = ({ media }: Props) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <Link to={`/info/${isMovie(media) ? "movie/" : "tv/"}` + media.id}>
      <Box
        className="cursor-pointer relative overflow-hidden"
        borderRadius="md"
        transition="all 0.3s ease-in-out"
        _hover={{ transform: "translateY(-8px)" }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {/* Image of movie card */}
        <Box position="relative">
          <Image
            borderRadius="md"
            transition="filter 0.3s ease-in-out"
            filter={show ? "brightness(0.8)" : "brightness(1)"}
            src={getTMDBImage(media.poster_path, "w500", "vertical")}
            alt={isMovie(media) ? media.title : media.original_name}
            objectFit="cover"
          />
          <Box transition="opacity 0.3s ease-in-out" opacity={show ? 0.8 : 0}>
            <Gradient.Bottom />
            <Gradient.Top />
          </Box>
        </Box>

        {/* Movie card rating and release date*/}
        <HStack
          opacity={show ? 1 : 0}
          transition="opacity 0.3s ease-in-out"
          position="absolute"
          top={4}
          px={2}
          w="full"
          justify="space-between"
        >
          <ReleaseDate
            date={isMovie(media) ? media.release_date : media.first_air_date}
          />
          <Rating vote_average={media.vote_average} />
        </HStack>
        <Stack
          opacity={show ? 1 : 0}
          transition="opacity 0.3s ease-in-out"
          position="absolute"
          bottom={8}
          px={2}
          w="full"
          gap={2}
        >
          <Text fontSize="md" fontWeight="medium" lineClamp="1">
            {isMovie(media) ? media.title : media.name}
          </Text>
          <Text fontSize="sm" lineClamp="2" lineHeight="1">
            {media.overview}
          </Text>
        </Stack>
      </Box>
    </Link>
  );
};

export default Card;
