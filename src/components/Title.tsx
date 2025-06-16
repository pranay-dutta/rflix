import { Box, Heading, Highlight } from "@chakra-ui/react";
import { BiMoviePlay } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Title = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" alignItems="center" onClick={() => navigate("/")} gap={1} cursor="pointer">
      <BiMoviePlay display="inline" size={20} />
      <Heading fontSize="xl" fontWeight="bold">
        <Highlight styles={{ color: "purple.400" }} query="lix">
          Rflix
        </Highlight>
      </Heading>
    </Box>
  );
};
export default Title;
