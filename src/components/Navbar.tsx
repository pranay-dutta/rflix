import { Button, createListCollection, Flex, HStack, Select } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Title from "./Title";
import { navItems, NavItem } from "./constants";
import { useState, useEffect, Fragment } from "react";
import SearchInput from "./SearchInput";
import { HoverCard } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import LoginButton from "./common/LoginButton";

const Navbar = () => {
  const isLargerThan1024 = useMediaQuery("only screen and (min-width: 1024px)");
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
      as={"nav"}
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
      {isLargerThan1024 ? (
        <>
          <Title />
          <Flex>
            {navItems.map((navitem) => (
              <DropDown key={navitem.label} navitem={navitem} />
            ))}
          </Flex>

          <Flex w="250px" gap={4} alignItems="center">
            <SearchInput />
            <LoginButton />
          </Flex>
        </>
      ) : (
        <>
          <LoginButton />
          <Title />
          <Sidebar />
        </>
      )}
    </HStack>
  );
};

const DropDown = ({ navitem }: { navitem: NavItem }) => {
  const navigate = useNavigate();

  if (!navitem.hasDropdown)
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
            <Select.Root open collection={mediaTags} w={"150px"}>
              {mediaTags.items.map((mediaTag, i) => (
                <Fragment key={i}>
                  {mediaTag.tag === navitem.label.toLowerCase() && (
                    <Select.Item
                      item={mediaTag}
                      key={mediaTag.value}
                      onClick={() => navigate(navitem.to + "/" + mediaTag.value)}
                    >
                      {mediaTag.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  )}
                </Fragment>
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

    { label: "Movies", value: "movie", tag: "discover" },
    { label: "TV Shows", value: "tv", tag: "discover" },

    { label: "About", value: "about", tag: "others" },
    { label: "Watch List", value: "watchlist", tag: "others" },
    { label: "Customize", value: "customize", tag: "others" },

    { label: "Popular", value: "popular", tag: "tv shows" },
    { label: "Top Rated", value: "top_rated", tag: "tv shows" },
    { label: "Airing Today", value: "airing_today", tag: "tv shows" },
    { label: "On The Air", value: "on_the_air", tag: "tv shows" },
  ],
});

export default Navbar;
