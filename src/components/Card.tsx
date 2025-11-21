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
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => navigate(`/info/${isMovie(media) ? "movie/" : "tv/"}` + media.id)}
      position="relative"
      overflow="hidden"
    >
      {/* Image of movie card */}
      <Image
        borderRadius="md"
        onLoad={() => setImgLoading(false)}
        transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        filter={show ? "brightness(0.7)" : "brightness(1)"}
        transform={show ? "scale3d(1.08, 1.08, 1)" : "scale3d(1, 1, 1)"}
        willChange="transform, filter"
        src={getTMDBImage(media.poster_path, "w342", "vertical")}
        alt={isMovie(media) ? media.title : media.original_name}
        objectFit="cover"
        loading="lazy"
        aspectRatio={2 / 3}
      />
      <Box
        transition="opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        opacity={show ? 0.7 : 0}
      >
        <Gradient.Bottom />
        <Gradient.Top />
      </Box>

      {/* Movie card rating and release date*/}
      <HStack
        opacity={show ? 1 : 0}
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        position="absolute"
        top={2}
        px={2}
        w="full"
        justify="space-between"
        textShadow="0 2px 8px rgba(0, 0, 0, 0.9)"
      >
        <Rating fontSize="sm" vote_average={media.vote_average} />
        <ReleaseDate
          fontSize="sm"
          date={isMovie(media) ? media.release_date : media.first_air_date}
        />
      </HStack>
      <Stack
        opacity={show ? 1 : 0}
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        transform={show ? "translateY(0)" : "translateY(20px)"}
        position="absolute"
        bottom={4}
        px={2}
        w="full"
        gap={2}
      >
        <Text
          fontSize="md"
          fontWeight="semibold"
          textWrap="balance"
          letterSpacing="0.025em"
        >
          {isMovie(media) ? media.title : media.name}
        </Text>
        <Text
          fontSize="xs"
          lineClamp="2"
          lineHeight="1.2"
          opacity={0.75}
          textShadow="0 1px 6px rgba(0, 0, 0, 0.8)"
          letterSpacing="0.015em"
        >
          {media.overview}
        </Text>
      </Stack>
    </Skeleton>
  );
};

export default Card;
