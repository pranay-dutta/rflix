import { Movie } from "@/hooks/useMovies";
import { Box, HStack, Image, Text, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { getPlaceHolder, getTMDBImage } from "./constants";
import Rating from "./Rating";
import ReleaseDate from "./ReleaseDate";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <Link to={"/info/" + movie.id}>
      <Box
        className="cursor-pointer relative"
        py={3}
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
              movie.poster_path
                ? getTMDBImage(movie.poster_path, "w500")
                : getPlaceHolder("w500")
            }
            alt={movie.original_title}
            objectFit="cover"
          />
          {
            /* Bottom gradient */
            show && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
            )
          }
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
              <ReleaseDate date={movie.release_date} />
              <Rating rating={movie.vote_average} />
            </HStack>
            <Stack position="absolute" bottom={10} px={2} w="full" gap={2}>
              <Text fontSize="md" fontWeight="medium" lineClamp="1">
                {movie.title}
              </Text>
              <Text fontSize="sm" lineClamp="2" lineHeight="1">
                {movie.overview}
              </Text>
            </Stack>
          </>
        )}
      </Box>
    </Link>
  );
};

export default MovieCard;
