import { Button } from "@chakra-ui/react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";

export const CollapsibleToggleButton = ({ onClick, open }: { onClick: () => void; open: boolean; }) => {
  return (
    <Button onClick={onClick} display="flex" justifyContent="space-between" width={{ base: "100px", md: "200px" }} variant="outline" size="md" color="gray.300">
      Filters
      {open ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
    </Button>
  );
};
