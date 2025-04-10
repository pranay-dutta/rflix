import { HStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const Rating = ({ rating }: { rating: number }) => {
  if (rating < 1) return null;
  return (
    <HStack gap={1}>
      <FaStar color="orange" />
      {rating.toFixed(1)}
    </HStack>
  );
};

export default Rating;
