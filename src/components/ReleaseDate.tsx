import { HStack } from "@chakra-ui/react";
import { BiCalendar } from "react-icons/bi";

const ReleaseDate = ({ date }: { date: string }) => {
  if (!date) return null;
  return (
    <HStack gap={1}>
      <BiCalendar />
      {date.substring(0, 4)}
    </HStack>
  );
};

export default ReleaseDate;