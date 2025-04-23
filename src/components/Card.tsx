import { Movie } from "@/interfaces/Movie";
import { Box, HStack, Image, Text, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { getPlaceHolder, getTMDBImage } from "./constants";
import Rating from "./Rating";
import ReleaseDate from "./ReleaseDate";
import { Link } from "react-router-dom";
import TvSeries from "@/interfaces/TvSeries";
import Gradient from "./Gradient";

interface Props {
  media: Movie | TvSeries;
}

const Card = ({ media }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const isMovie = (media: Movie | TvSeries): media is Movie => {
    return (media as Movie).title !== undefined;
  };

  return (
    <Link to={`/info/${isMovie(media) ? "movie/" : "tv/"}` + media.id}>
      <Box
        className="cursor-pointer relative overflow-hidden"
        borderRadius="md"
        _hover={{
          scale: 1.03,
          transition: "all 0.3s ease-in-out",
          transform: "translateY(-5px)",
        }}
        transition="all 0.3s ease-in-out"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {/* Image of movie card */}
        <Box position="relative">
          <Image
            borderRadius="md"
            filter={show ? "brightness(0.8)" : "brightness(1)"}
            src={
              media.poster_path
                ? getTMDBImage(media.poster_path, "w500")
                : getPlaceHolder("w500")
            }
            alt={isMovie(media) ? media.title : media.original_name}
            objectFit="cover"
          />
          {show && (
            <>
              <Gradient.Bottom />
              <Gradient.Top />
            </>
          )}
        </Box>

        {/* Movie card rating and release date*/}
        {show && (
          <>
            <HStack
              position="absolute"
              top={4}
              px={2}
              w="full"
              justify="space-between"
            >
              <ReleaseDate
                date={
                  isMovie(media) ? media.release_date : media.first_air_date
                }
              />
              <Rating rating={media.vote_average} />
            </HStack>
            <Stack position="absolute" bottom={10} px={2} w="full" gap={2}>
              <Text fontSize="md" fontWeight="medium" lineClamp="1">
                {isMovie(media) ? media.title : media.name}
              </Text>
              <Text fontSize="sm" lineClamp="2" lineHeight="1">
                {media.overview}
              </Text>
            </Stack>
          </>
        )}
      </Box>
    </Link>
  );
};

export default Card;
