import {
  ButtonGroup,
  Pagination as ChakraPagination,
  IconButton,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface Props {
  changePage: (pageNo: number) => void;
  currentPage: number;
}

const Pagination = ({ changePage, currentPage }: Props) => {
  return (
    <ChakraPagination.Root
      display="flex"
      count={500 * 20}
      pageSize={20}
      defaultPage={currentPage}
      onPageChange={(e) => changePage(e.page)}
    >
      <ButtonGroup variant="outline" size="sm" margin="auto">
        <ChakraPagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </ChakraPagination.PrevTrigger>

        <ChakraPagination.Items
          render={(page) => (
            <IconButton variant={{ base: "outline", _selected: "solid" }}>
              {page.value}
            </IconButton>
          )}
        />

        <ChakraPagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </ChakraPagination.NextTrigger>
      </ButtonGroup>
    </ChakraPagination.Root>
  );
};
export default Pagination;
