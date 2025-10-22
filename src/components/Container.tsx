import { Container as ChakraContainer, ContainerProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props extends ContainerProps {
  children: ReactNode;
}

const Container = ({ children, ...rest }: Props) => {
  return <ChakraContainer {...rest}>{children}</ChakraContainer>;
};

export default Container;
