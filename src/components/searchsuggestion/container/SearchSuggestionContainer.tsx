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

const SearchSuggestionContainer = ({ searchTerm, setShowSuggestions }: Props) => {
  const navigate = useNavigate();
  const { movieResponse, tvResponse, isLoading, error } = useSearchSuggestion(searchTerm);

  const handleSuggestionClick = (media: TvSeries | Movie) => {
    const destination = isMovie(media) ? "movie" : "tv";
    navigate(`/info/${destination}/${media.id}`);
    setShowSuggestions(false);
  };

  const mediaSuggestion = [
    ...(movieResponse?.results?.slice(0, 5) ?? []),
    ...(tvResponse?.results?.slice(0, 5) ?? []),
  ];

  if (isLoading || error || mediaSuggestion.length === 0) return null;

  return (
    <Box
      position="absolute"
      top="100%"
      left={0}
      right={{ md: 0, base: "-35%" }}
      bg="gray.950"
      mt={2}
      p={2}
      rounded="lg"
      zIndex={10}
      boxShadow="2xl"
      border="1px solid"
      borderColor="gray.800"
      maxH="400px"
      overflowY="auto"
    >
      {mediaSuggestion.map((suggestion) => (
        <Box onClick={() => handleSuggestionClick(suggestion)} key={suggestion.id}>
          <SearchSuggestion suggestion={suggestion} />
        </Box>
      ))}
    </Box>
  );
};

export default SearchSuggestionContainer;
