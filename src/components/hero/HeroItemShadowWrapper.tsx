import { Box } from "@chakra-ui/react";

interface Props {
  show: boolean;
  children: React.ReactNode;
}

const HeroItemShadowWrapper = ({ children, show }: Props) => {
  return (
    <Box
      transition="all 0.3s"
      transform={`translateY(${show ? "0" : "-20px"})`}
      opacity={show ? 1 : 0}
      className="drop-shadow-2xl/35"
    >
      {children}
    </Box>
  );
};
export default HeroItemShadowWrapper;
