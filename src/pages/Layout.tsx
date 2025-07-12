import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTopOnLoad from "@/utils/ScrollToTopOnLoad";
import { Container } from "@chakra-ui/react";
import { useSession } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import SignUp from "./SignUp";

const Layout = () => {
  const { isSignedIn } = useSession();
  if (!isSignedIn) return <SignUp />;

  return (
    <div>
      <ScrollToTopOnLoad />
      <Navbar />
      <Container py={5} mt={12}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
