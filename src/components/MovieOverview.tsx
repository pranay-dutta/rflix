import { Text } from "@chakra-ui/react";

const MovieOverview = ({ overview }: { overview: string }) => {
  return (
    <Text
      filter={"contrast(2)"}
      width={{ base: 300, sm: 500, lg: 850 }}
      fontSize="lg"
      lineHeight="initial"
      lineClamp={{ base: 2, md: 3 }}
    >
      {overview}
    </Text>
  );
};
export default MovieOverview;
