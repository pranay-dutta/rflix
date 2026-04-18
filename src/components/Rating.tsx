import { Box, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import type { BoxProps } from "@chakra-ui/react";
import useCustomizationStore from "@/store/customizationStore";

interface Props {
  vote_average: number;
}
type RatingProps = Props & BoxProps;

const Rating = (props: RatingProps) => {
  const activePalette = useCustomizationStore((s) => s.activePalette);
  const { vote_average, ...rest } = props;

  return (
    <Box display="flex" alignItems="center" gap={1} {...rest}>
      <FaStar color={activePalette} />
      <Text color="white">{vote_average.toFixed(1)}</Text>
    </Box>
  );
};

export default Rating;
