import { HStack } from "@chakra-ui/react";
import { BiCalendar } from "react-icons/bi";

const ReleaseDate = ({ date }: { date: string }) => {
  return (
    <HStack gap={1} fontSize="lg">
      <BiCalendar />
      {date}
    </HStack>
  );
};

export default ReleaseDate;
