import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { getTMDBImage } from "./constants";
import { Movie } from "@/hooks/useMovies";
import Rating from "./Rating";
import { useState } from "react";
import ReleaseDate from "./ReleaseDate";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [showRating, setShowRating] = useState<boolean>(false);
  return (
    <Box
      className="cursor-pointer relative"
      py={3}
      _hover={{
        scale: 1.03,
        transition: "all 0.3s ease-in-out",
        transform: "translateY(-5px)",
      }}
      transition="all 0.3s ease-in-out"
      onMouseEnter={() => setShowRating(true)}
      onMouseLeave={() => setShowRating(false)}
    >
      {/* Image of movie card */}
      <Image
        borderRadius="md"
        _hover={{
          filter: "brightness(0.6)",
          transition: "all 0.3s ease-in-out",
        }}
        src={getTMDBImage(movie.poster_path, "w500")}
        alt={movie.original_title}
        objectFit="cover"
      />
      <Text mt={2} lineClamp={1}>
        {movie.title}
      </Text>

      {/* Movie card rating and release date*/}
      {showRating && (
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
      )}
    </Box>
  );
};

export default MovieCard;
