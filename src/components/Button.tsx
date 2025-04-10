import { Button as ChakraButton } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface Props {
  children: ReactNode;
  icon: IconType;
}

const Button = ({ children, icon }: Props) => {
  const Icon = icon;

  return (
    <ChakraButton
      rounded="md"
      _hover={{ scale: 1.1 , opacity: 0.9}}
      w={{ base: 100, sm: 120 }}
    >
      <Icon />
      {children}
    </ChakraButton>
  );
};

export default Button;
