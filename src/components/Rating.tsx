import { Box, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import type { BoxProps } from "@chakra-ui/react";
import useCustomizationStore from "@/store/customizationStore";

interface Props {
  vote_average: number;
}
type RatingProps = Props & BoxProps;

const Rating = (p: RatingProps) => {
  const activePalette = useCustomizationStore((s) => s.activePalette);

  return (
    <Box display="flex" alignItems="center" gap={1} {...p}>
      <FaStar color={activePalette} />
      <Text color="white">{p.vote_average.toFixed(1)}</Text>
    </Box>
  );
};

export default Rating;
