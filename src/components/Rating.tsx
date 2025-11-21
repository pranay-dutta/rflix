import { HStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const Rating = ({ vote_average, fontSize }: { vote_average: number, fontSize?: string }) => {
  if (!vote_average) return null;

  return (
    <HStack gap={1} fontSize={fontSize}>
      <FaStar color="orange" />
      {vote_average.toFixed(1)}
    </HStack>
  );
};

export default Rating;
