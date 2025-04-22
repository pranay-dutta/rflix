import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Container py={5} mt={12}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
