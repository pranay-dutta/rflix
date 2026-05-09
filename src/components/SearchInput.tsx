import { Box, Input, InputGroup } from "@chakra-ui/react";
import { KeyboardEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchSuggestionContainer from "./searchsuggestion/container/SearchSuggestionContainer";
import { LuSearch } from "react-icons/lu";
import { forwardRef } from "react";

const SearchInput = forwardRef<HTMLInputElement>((_, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();

  const onKeyDown = (e: KeyboardEvent | MouseEvent) => {
    if (("key" in e && e.key === "Enter") || e.type === "click") {
      if (searchTerm) {
        navigate(`/search?query=${searchTerm}`);
        setShowSuggestions(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 2);
  };
  if (!ref) return null;

  return (
    <Box>
      <Box border="1px solid #333" borderRadius="lg">
        <InputGroup flex="1" startElement={<LuSearch />}>
          <Input
            ref={ref}
            borderRadius="lg"
            value={searchTerm}
            onKeyDown={onKeyDown}
            onChange={handleInputChange}
            onFocus={() => searchTerm.length > 2 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 300)}
            placeholder="Search..."
            outline="none"
            border="none"
            backgroundColor="blackAlpha.800"
          />
        </InputGroup>
      </Box>
      {/* Suggestion Box */}
      {showSuggestions && (
        <SearchSuggestionContainer
          searchTerm={searchTerm}
          setShowSuggestions={setShowSuggestions}
        />
      )}
    </Box>
  );
});

export default SearchInput;
