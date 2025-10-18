import { getTMDBImage } from "@/components/constants";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import isMovie from "@/utils/isMovie";
import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { MdOutlineLiveTv, MdOutlineMovie } from "react-icons/md";

interface SearchSuggestionProps {
  suggestion: Movie | TvSeries;
}

const SearchSuggestion = ({ suggestion }: SearchSuggestionProps) => {
  const is_movie = isMovie(suggestion);
  const accent = is_movie ? "blue.400" : "orange.400";
  const title = is_movie ? suggestion.title : suggestion.name;
  const mediaType = is_movie ? "Movie" : "TV Show";
  const releaseDate = is_movie ? suggestion.release_date : suggestion.first_air_date;
  const posterPath = suggestion.poster_path;

  return (
    <Box>
      <HStack
        py={1.5}
        px={3}
        minH="42px"
        borderRadius="md"
        cursor="pointer"
        _hover={{ bg: "gray.700", transform: "translateY(-1px)" }}
        gap={3}
        transition="all 0.2s"
        alignItems="center"
      >
        <Box flex="1">
          <HStack gap={3} mb={1} alignItems="center">
            {is_movie ? (
              <Box color={accent} fontSize="lg">
                <MdOutlineMovie size={18} />
              </Box>
            ) : (
              <Box color={accent} fontSize="lg">
                <MdOutlineLiveTv size={18} />
              </Box>
            )}

            <Text color="white" fontSize="sm" fontWeight="medium" lineHeight="1.2">
              {title}
            </Text>
          </HStack>
          <HStack gap={2} fontSize="xs">
            <Text color="gray.400">{new Date(releaseDate).getFullYear()}</Text>

            <Text color="gray.500">•</Text>
            <Text color={accent} fontWeight="medium">
              {mediaType}
            </Text>
          </HStack>
        </Box>
        <Image
          src={getTMDBImage(posterPath, "w92")}
          alt={title}
          w="28px"
          h="40px"
          objectFit="cover"
          borderRadius="md"
          border="1px solid"
          borderColor="gray.600"
          flexShrink={0}
        />
      </HStack>
      <Box
        height="1px"
        mx={4}
        my={2}
        background="linear-gradient(90deg, transparent 0%, #6B7280 50%, transparent 100%)"
        borderRadius="full"
      />
    </Box>
  );
};

export default SearchSuggestion;
