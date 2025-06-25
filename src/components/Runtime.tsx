import { Text } from "@chakra-ui/react";

const Runtime = ({ runtime }: { runtime: number }) => {
  if (!runtime) return null;
  return <Text>{runtime} min</Text>;
};

export default Runtime;
