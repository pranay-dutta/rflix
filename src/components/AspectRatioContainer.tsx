import { AspectRatio } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const AspectRatioContainer = ({ children }: PropsWithChildren) => {
  return (
    <AspectRatio className="h-[600px] md:h-svh" zIndex="-1" overflow="hidden">
      {children}
    </AspectRatio>
  );
};

export default AspectRatioContainer;
