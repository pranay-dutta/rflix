import { Text } from "@chakra-ui/react";

const Runtime = ({ runtime }: { runtime: number }) => {
  return <Text>{runtime} min</Text>;
};

export default Runtime;
