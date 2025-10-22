import { Movie } from "@/interfaces/Movie";
import { Box, HStack, Image, Text, Stack, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { getTMDBImage } from "./constants";
import Rating from "./Rating";
import ReleaseDate from "./ReleaseDate";
import { Link } from "react-router-dom";
import TvSeries from "@/interfaces/TvSeries";
import Gradient from "./Gradient";
import isMovie from "@/utils/isMovie";
import { ImageProps } from "@chakra-ui/react";

interface Props extends ImageProps {
  media: Movie | TvSeries;
}

const Card = ({ media, width, height }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [imgLoading, setImgLoading] = useState<boolean>(true);

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
        <Skeleton loading={imgLoading} position="relative">
          <Image
            borderRadius="md"
            onLoad={() => setImgLoading(false)}
            transition="filter 0.3s ease-in-out"
            filter={show ? "brightness(0.8)" : "brightness(1)"}
            src={getTMDBImage(media.poster_path, "w342", "vertical")}
            alt={isMovie(media) ? media.title : media.original_name}
            objectFit="cover"
            loading="lazy"
            h={height}
            w={width}
          />
          <Box transition="opacity 0.3s ease-in-out" opacity={show ? 0.8 : 0}>
            <Gradient.Bottom />
            <Gradient.Top />
          </Box>
        </Skeleton>

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
