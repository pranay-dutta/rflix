import { Box, Button, Group, Input } from "@chakra-ui/react";
import { KeyboardEvent, MouseEvent, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import SearchSuggestionContainer from "./searchsuggestion/container/SearchSuggestionContainer";

const SearchInput = () => {
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

  return (
    <>
      <Group attached w="full" maxW="sm">
        <Box position="relative" flex="1">
          <Input
            value={searchTerm}
            onKeyDown={onKeyDown}
            onChange={handleInputChange}
            onFocus={() => searchTerm.length > 2 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 300)}
            placeholder="Search..."
          />
          {/* Suggestion Box */}
          {showSuggestions && (
            <SearchSuggestionContainer
              searchTerm={searchTerm}
              setShowSuggestions={setShowSuggestions}
            />
          )}
        </Box>

        <Button variant="outline" onClick={onKeyDown}>
          <LuSearch />
        </Button>
      </Group>
    </>
  );
};

export default SearchInput;
