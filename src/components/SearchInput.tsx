import { Button, Group, Input } from "@chakra-ui/react";
import { KeyboardEvent, MouseEvent, useRef } from "react";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onKeyDown = (e: KeyboardEvent | MouseEvent) => {
    if ('key' in e && e.key === "Enter" || e.type === 'click') {
      const searchTerm = inputRef.current?.value;
      if (searchTerm) navigate(`/search?query=${searchTerm}`);
    }
  };
  return (
    <>
      <Group attached w="full" maxW="sm">
        <Input flex="1" ref={inputRef} onKeyDown={onKeyDown} placeholder="Search..." />
        <Button variant="outline" onClick={onKeyDown}><LuSearch /></Button>
      </Group>

    </>
  );
};

export default SearchInput;
