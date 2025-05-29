import {
  Button,
  createListCollection,
  Flex,
  HStack,
  Select,
  useMediaQuery,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Title from "./Title";
import { navItems, NavItem } from "./constants";
import { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import { HoverCard } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

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

      {isLargerThan1024 && (
        <Flex>
          {navItems.map((navitem) => (
            <DropDown key={navitem.label} navitem={navitem} />
          ))}
        </Flex>
      )}
      <HStack gap={4}>
        {isLargerThan1024 && <SearchInput />}
        {!isLargerThan1024 && <Sidebar />}
      </HStack>
    </HStack>
  );
};

const DropDown = ({ navitem }: { navitem: NavItem }) => {
  const navigate = useNavigate();

  if (!navitem.showDropdown)
    return (
      <Link to={navitem.to}>
        <Button size="md" variant="ghost">
          <navitem.icon />
          {navitem.label}
        </Button>
      </Link>
    );

  return (
    <>
      <HoverCard.Root openDelay={100} closeDelay={200}>
        <HoverCard.Trigger asChild>
          <Button size="md" variant="ghost">
            <navitem.icon />
            {navitem.label}
          </Button>
        </HoverCard.Trigger>

        <HoverCard.Positioner>
          <HoverCard.Content p={2}>
            <Select.Root open collection={mediaTags} w={"200px"}>
              {mediaTags.items.map((mediaTag, i) => (
                <div key={i}>
                  {mediaTag.tag == navitem.label.toLowerCase() && (
                    <Select.Item
                      item={mediaTag}
                      key={mediaTag.value}
                      onClick={() => navigate(navitem.to + "/" + mediaTag.value)}
                    >
                      {mediaTag.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  )}
                </div>
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
    { label: "Popular", value: "popular", tag: "movies" },
    { label: "Top Rated", value: "top_rated", tag: "movies" },
    { label: "Now Playing", value: "now_playing", tag: "movies" },
    { label: "Upcoming", value: "upcoming", tag: "movies" },

    { label: "Popular", value: "popular", tag: "tv series" },
    { label: "Top Rated", value: "top_rated", tag: "tv series" },
    { label: "Airing Today", value: "airing_today", tag: "tv series" },
    { label: "On The Air", value: "on_the_air", tag: "tv series" },
  ],
});

export default Navbar;
