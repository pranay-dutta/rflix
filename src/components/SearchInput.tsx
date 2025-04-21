import { Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { KeyboardEvent } from "react";

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const searchTerm = inputRef.current?.value;
      if (searchTerm) navigate(`/search?query=${searchTerm}`);
    }
  };
  return (
    <InputGroup flex="1" endElement={<LuSearch />}>
      <Input placeholder="Search..." ref={inputRef} onKeyDown={onKeyDown} />
    </InputGroup>
  );
};

export default SearchInput;
