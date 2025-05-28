import { Button as ChakraButton } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  icon: IconType;
  id: number;
  season: number;
  episode: number;
}

const TvSeriesWatchButton = ({ children, icon, season, id, episode }: Props) => {
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
      rounded="md"
      _hover={{ scale: 1.1, opacity: 0.9 }}
      width="fit-content"
      onClick={() => navigate(`/watch/tv/${id}/${season}/${episode}`)}
    >
      <Icon />
      {children}
    </ChakraButton>
  );
};

export default TvSeriesWatchButton;
