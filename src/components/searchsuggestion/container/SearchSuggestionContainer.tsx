import useSearchSuggestion from "@/hooks/useSearchSuggestion";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import isMovie from "@/utils/isMovie";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SearchSuggestion from "../presentation/SearchSuggestion";

interface Props {
  setShowSuggestions: (show: boolean) => void;
  searchTerm: string;
}

export interface SearchSuggestionProps {
  is_movie: boolean;
  accent: string;
  title: string;
  mediaType: string;
  releaseDate: string;
  posterPath: string;
}

const SearchSuggestionContainer = ({ searchTerm, setShowSuggestions }: Props) => {
  const navigate = useNavigate();
  const { movieResponse, tvResponse, isLoading, error } = useSearchSuggestion(searchTerm);

  const handleSuggestionClick = (media: TvSeries | Movie) => {
    const destination = isMovie(media) ? "movie" : "tv";
    navigate(`/info/${destination}/${media.id}`);
    setShowSuggestions(false);
  };

  const mediaSuggestion = [
    ...(movieResponse?.results?.slice(0, 10) ?? []),
    ...(tvResponse?.results?.slice(0, 10) ?? []),
  ];

  const extractProperties = (media: TvSeries | Movie) => {
    const is_movie = isMovie(media);
    const accent = is_movie ? "blue.400" : "orange.400";
    const title = is_movie ? media.title : media.name;
    const mediaType = is_movie ? "Movie" : "TV Show";
    const releaseDate = is_movie ? media.release_date : media.first_air_date;
    const posterPath = media.poster_path;
    return { is_movie, accent, title, mediaType, releaseDate, posterPath };
  };

  if (isLoading || mediaSuggestion.length === 0) return null;
  if (error)
    return (
      <Box mt={2} color="red.300">
        Error fetching suggestions
      </Box>
    );

  return (
    <Box
      mt={2}
      p={2}
      rounded="lg"
      zIndex={10}
      boxShadow="2xl"
      border="1px solid"
      borderColor="gray.800"
      maxH="300px"
      overflowY="auto"
      bg="blackAlpha.800"
      onMouseDown={(e) => e.preventDefault()}
    >
      {mediaSuggestion.map((suggestion) => {
        return (
          <Box onClick={() => handleSuggestionClick(suggestion)} key={suggestion.id}>
            <SearchSuggestion {...extractProperties(suggestion)} />
          </Box>
        );
      })}
    </Box>
  );
};

export default SearchSuggestionContainer;
