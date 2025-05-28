import { Box, Heading, Highlight } from "@chakra-ui/react";
import { BiMoviePlay } from "react-icons/bi";
import { Link } from "react-router-dom";

const Title = () => {
  return (
    <Link to="/">
      <Box display="flex" alignItems="center" gap={1}>
        <BiMoviePlay display="inline" size={20} />
        <Heading fontSize="xl" fontWeight="bold">
          <Highlight styles={{ color: "red" }} query="lix">
            Rflix
          </Highlight>
        </Heading>
      </Box>
    </Link>
  );
};
export default Title;
