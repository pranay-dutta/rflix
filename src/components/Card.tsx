import { Movie } from "@/interfaces/Movie";
import { Box, HStack, Image, Text, Stack, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { getTMDBImage } from "./constants";
import Rating from "./Rating";
import ReleaseDate from "./ReleaseDate";
import { useNavigate } from "react-router-dom";
import TvSeries from "@/interfaces/TvSeries";
import Gradient from "./Gradient";
import isMovie from "@/utils/isMovie";

interface Props {
  media: Movie | TvSeries;
}

const Card = ({ media }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [imgLoading, setImgLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  return (
    <Skeleton
      loading={imgLoading}
      className="cursor-pointer"
      borderRadius="md"
      transition="all 0.3s ease-in-out"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => navigate(`/info/${isMovie(media) ? "movie/" : "tv/"}` + media.id)}
      position="relative"
    >
      {/* Image of movie card */}
      <Image
        borderRadius="md"
        onLoad={() => setImgLoading(false)}
        transition="filter 0.3s ease-in-out"
        filter={show ? "brightness(0.8)" : "brightness(1)"}
        src={getTMDBImage(media.poster_path, "w342", "vertical")}
        alt={isMovie(media) ? media.title : media.original_name}
        objectFit="cover"
        loading="lazy"
        aspectRatio={2 / 3}
      />
      <Box transition="opacity 0.3s ease-in-out" opacity={show ? 0.8 : 0}>
        <Gradient.Bottom />
        <Gradient.Top />
      </Box>

      {/* Movie card rating and release date*/}
      <HStack
        opacity={show ? 1 : 0}
        transition="all 0.3s ease-in-out"
        position="absolute"
        top={3}
        px={2}
        w="full"
        justify="space-between"
      >
        <ReleaseDate date={isMovie(media) ? media.release_date : media.first_air_date} />
        <Rating vote_average={media.vote_average} />
      </HStack>
      <Stack
        opacity={show ? 1 : 0}
        transition="all 0.3s ease-in-out"
        transform={show ? "translateY(-10px)" : "translateY(20px)"}
        position="absolute"
        bottom={4}
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
    </Skeleton>
  );
};

export default Card;
