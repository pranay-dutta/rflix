import { ButtonProps, Button as ChakraButton } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

interface Props extends ButtonProps {
  children: ReactNode;
  icon: IconType;
  movieId: number;
}

const InfoButton = ({ children, icon, movieId, ...props }: Props) => {
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
      onClick={() => navigate("/info/movie/" + movieId)}
      {...props}
    >
      <Icon />
      {children}
    </ChakraButton>
  );
};

export default InfoButton;
