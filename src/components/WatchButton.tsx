import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

interface WatchButtonProps extends ButtonProps {
  children: ReactNode;
  icon: IconType;
  movieId: number;
}

const MovieWatchButton = ({ children, icon, movieId, ...props }: WatchButtonProps) => {
  const Icon = icon;
  const navigate = useNavigate();

  return (
    <ChakraButton
      fontSize="sm"
      paddingX={5}
      paddingY={2}
      backgroundColor="whiteAlpha.200"
      color="whiteAlpha.900"
      borderRadius="md"
      fontWeight={500}
      _focus={{ outline: "none", boxShadow: "outline" }}
      _hover={{ transform: "scale(1.1)", opacity: 0.9 }}
      width="fit-content"
      onClick={() => navigate("/watch/movie/" + movieId)}
      {...props}
    >
      <Icon />
      {children}
    </ChakraButton>
  );
};

export default MovieWatchButton;
