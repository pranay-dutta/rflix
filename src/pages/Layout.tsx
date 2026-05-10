import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import ScrollToTopOnLoad from "@/utils/ScrollToTopOnLoad";
import { Box, Container, Flex } from "@chakra-ui/react";
import { useSession } from "@clerk/clerk-react";
import { Outlet, useLocation } from "react-router-dom";
import SignUp from "./SignUp";

const Layout = () => {
  const { isLoaded, isSignedIn } = useSession();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Avoid mount/unmount flicker while Clerk is still determining auth state.
  if (!isLoaded) return null;
  if (!isHome && !isSignedIn) return <SignUp />;

  return (
    <Flex direction="column" minH="100vh">
      <ScrollToTopOnLoad />
      <Navbar />
      {isHome ? (
        <Box flex="1">
          <Outlet />
        </Box>
      ) : (
        <Container py={5} mt={12} flex="1">
          <Outlet />
        </Container>
      )}
      <Box mt="auto" mb={3}>
        <Footer />
      </Box>
    </Flex>
  );
};

export default Layout;
