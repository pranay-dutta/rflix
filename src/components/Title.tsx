import { Box, Heading } from "@chakra-ui/react";
import { RiMovie2AiFill } from "react-icons/ri";

const Title = () => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <RiMovie2AiFill color="aqua" size={24} />
      <Heading fontSize="xl" fontWeight="bold">
        Nunflix
      </Heading>
    </Box>
  );
};
export default Title;
