import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTopOnLoad from "@/utils/ScrollToTopOnLoad";
import { Box, Container, Flex } from "@chakra-ui/react";
import { useSession } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import SignUp from "./SignUp";

const Layout = () => {
  const { isSignedIn } = useSession();
  if (!isSignedIn) return <SignUp />;

  return (
    <Flex direction="column" minH="100vh">
      <ScrollToTopOnLoad />
      <Navbar />
      <Container py={5} mt={12} flex="1">
        <Outlet />
      </Container>
      <Box mt="auto" mb={3}>
        <Footer />
      </Box>
    </Flex>
  );
};

export default Layout;
