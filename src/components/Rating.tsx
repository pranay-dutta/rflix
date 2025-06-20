import { HStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const Rating = ({ vote_average }: { vote_average: number }) => {
  if (vote_average < 1) return null;
  return (
    <HStack gap={1}>
      <FaStar color="orange" />
      {vote_average.toFixed(1)}
    </HStack>
  );
};

export default Rating;
