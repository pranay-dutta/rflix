import { HStack } from "@chakra-ui/react";
import { IoLanguage } from "react-icons/io5";
import { Badge } from "@chakra-ui/react";

const MovieLanguage = ({ language }: { language: string }) => {
  return (
    <Badge colorPalette="orange" variant="surface" size="lg">
      <HStack gap={2}>
        <IoLanguage />
        {language.toUpperCase()}
      </HStack>
    </Badge>
  );
};

export default MovieLanguage;
