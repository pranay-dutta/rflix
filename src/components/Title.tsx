import { Box, Heading } from "@chakra-ui/react";
import { RiMovie2AiFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Title = () => {
  return (
    <Link to="/">
      <Box display="flex" alignItems="center" gap={2}>
        <RiMovie2AiFill color="aqua" size={24} />
        <Heading fontSize="xl" fontWeight="bold">
          Nunflix
        </Heading>
      </Box>
    </Link>
  );
};
export default Title;
