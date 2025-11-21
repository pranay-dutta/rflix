import { HStack } from "@chakra-ui/react";
import { BiTime } from "react-icons/bi";

const ReleaseDate = ({ date, fontSize }: { date: string; fontSize?: string }) => {
  if (!date) return null;
  return (
    <HStack gap={1} fontSize={fontSize}>
      <BiTime />
      {date.substring(0, 4)}
    </HStack>
  );
};

export default ReleaseDate;
