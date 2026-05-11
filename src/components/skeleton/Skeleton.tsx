import { Skeleton as ChakraSkeleton } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props extends React.ComponentProps<typeof ChakraSkeleton> {
  children?: ReactNode;
}
const Skeleton = ({ children, ...rest }: Props) => {
  return (
    <ChakraSkeleton
      border="1px solid"
      borderColor="gray.800"
      backgroundColor="gray.900"
      {...rest}
    >
      {children}
    </ChakraSkeleton>
  );
};

export default Skeleton;
