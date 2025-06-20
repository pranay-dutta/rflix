import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export const CollapsibleWrapper = ({ children, open }: { open: boolean; children: ReactNode; }) => {
  return (
    <Box
      overflow="hidden"
      transition="all 0.4s ease-out"
      maxHeight={open ? "300px" : "0px"} // tweak 300px as needed
    >
      {children}
    </Box>
  );
};
