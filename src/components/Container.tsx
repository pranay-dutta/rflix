import { Container as ChakraContainer, ContainerProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props extends ContainerProps {
  children: ReactNode;
}

const Container = ({ children, ...rest }: Props) => {
  return (
    <ChakraContainer
      maxW={{
        base: "sm", 
        sm: "md",
        md: "3xl",
        lg: "5xl",
        xl: "7xl",
      }}
      {...rest}
    >
      {children}
    </ChakraContainer>
  );
};

export default Container;
