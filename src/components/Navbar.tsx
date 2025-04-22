import { Box, Button, HStack, useMediaQuery } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Title from "./Title";
import { items } from "./constants";
import { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

interface Pos {
  y: number;
  show: boolean;
}

const Navbar = () => {
  const [position, setPosition] = useState<Pos>({ y: 0, show: true });
  const [isLargerThan1024] = useMediaQuery(["(min-width: 1024px)"]);
  useEffect(() => {
    const handleScroll = () => {
      setPosition((prev) => ({ ...prev, show: window.scrollY < 10 }));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HStack
      px={5}
      py={2}
      justifyContent="space-between"
      w={"full"}
      bg="gray.950"
      transform={position.show ? "translateY(0)" : "translateY(-100%)"}
      transition="transform 0.3s ease-in-out"
      position="fixed"
      top={0}
      zIndex="100"
    >
      <Title />
      {isLargerThan1024 && (
        <Box display="flex">
          {items.map(({ icon: Icon, label, to }) => (
            <Link to={to} key={label}>
              <Button size="md" variant="ghost">
                <Icon />
                {label}
              </Button>
            </Link>
          ))}
        </Box>
      )}

      <HStack gap={4}>
        {isLargerThan1024 && <SearchInput />}
        {!isLargerThan1024 && <Sidebar />}
      </HStack>
    </HStack>
  );
};

export default Navbar;
