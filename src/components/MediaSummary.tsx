import { Text } from "@chakra-ui/react";

const MediaSummary = ({ overview }: { overview: string }) => {
  return (
    <Text
      textAlign="left"
      lineHeight="tall"
      color="gray.100"
      width={{ md: "60ch", base: "40ch" }}
      fontSize={{ base: "small", md: "sm" }}
      lineClamp={{ base: 2, md: 3 }}
    >
      {overview}
    </Text>
  );
};
export default MediaSummary;
