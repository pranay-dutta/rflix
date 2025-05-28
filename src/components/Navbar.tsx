import { Button, createListCollection, Flex, HStack, Select, useMediaQuery } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Title from "./Title";
import { items, NavItem } from "./constants";
import { useState, useEffect } from "react";
import SearchInput from "./SearchInput";

const Navbar = () => {
  const [isLargerThan1024] = useMediaQuery(["(min-width: 1024px)"]);
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      setShow(() => window.scrollY < 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HStack
      px={5}
      py={2}
      justifyContent="space-between"
      w={"full"}
      bg="gray.950"
      transform={show ? "translateY(0)" : "translateY(-100%)"}
      transition="transform 0.3s ease-in-out"
      position="fixed"
      top={0}
      zIndex="100"
    >
      <Title />

      {isLargerThan1024 && <Flex>{items.map(item => <DropDown key={item.label} item={item} />)}</Flex>}
      <HStack gap={4}>
        {isLargerThan1024 && <SearchInput />}
        {!isLargerThan1024 && <Sidebar />}
      </HStack>
    </HStack>
  );
};

export default Navbar;


import { HoverCard } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const DropDown = ({ item }: { item: NavItem }) => {
  const navigate = useNavigate();

  if (!item.showDropdown) return (
    <Link to={item.to}>
      <Button size="md" variant="ghost" >
        <item.icon />
        {item.label}
      </Button>
    </Link>
  )

  return (
    <>
      <HoverCard.Root openDelay={100} closeDelay={200}>
        <HoverCard.Trigger asChild>
          <Button size="md" variant="ghost">
            <item.icon />
            {item.label}
          </Button>
        </HoverCard.Trigger>

        <HoverCard.Positioner>
          <HoverCard.Content p={2}>
            <Select.Root open collection={mediaTags} w={"200px"} >
              {mediaTags.items.map((tag) => (
                <Select.Item
                  item={tag}
                  key={tag.value}
                  onClick={() => navigate(item.to + "/" + tag.value)}
                >
                  {tag.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Root>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </HoverCard.Root>
    </>
  );
};
const mediaTags = createListCollection({
  items: [
    { label: "Popular", value: "popular" },
    { label: "Now Playing", value: "now_playing" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Top Rated", value: "top_rated" },
  ],
});
