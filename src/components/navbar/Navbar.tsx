import { Container, Flex, Group, HStack, useMediaQuery } from "@chakra-ui/react";
import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BrowseMenu from "../browsemenu/BrowseMenu";
import LoginButton from "../common/LoginButton";
import HomeButton from "../HomeButton";
import SearchDialogButton from "../search/SearchDialogButton";
import Title from "../Title";

const Navbar = () => {
  const [isLargerThan1024] = useMediaQuery(["(min-width: 1024px)"]);
  const [show, setShow] = useState<boolean>(true);
  const { pathname } = useLocation();

  // Ensure the navbar is visible immediately on navigation.
  useLayoutEffect(() => {
    setShow(true);
  }, [pathname]);

  //Use "layout effect" because it runs before initial paint
  useLayoutEffect(() => {
    const handleScroll = () => setShow(() => window.scrollY < 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HStack
      as={"nav"}
      px={4}
      position="fixed"
      zIndex="100"
      bgColor="transparent"
      transform={show ? "translateY(0)" : "translateY(-100%)"}
      transition="transform 0.1s ease-in-out"
      justifyContent="space-between"
      top={0}
      w="full"
      h={20}
    >
      {/* Larger screen */}
      {isLargerThan1024 ? (
        <Container>
          <Flex justifyContent="space-between" alignItems="center">
            <Title />
            <Group gap={4}>
              <HomeButton />
              <BrowseMenu />
              <SearchDialogButton />
              <LoginButton />
            </Group>
          </Flex>
        </Container>
      ) : (
        <>
          {/* Smaller screen */}
          <Title />
          <Group gap={4}>
            <SearchDialogButton />
            <BrowseMenu />
            <LoginButton />
          </Group>
        </>
      )}
    </HStack>
  );
};

export default Navbar;
