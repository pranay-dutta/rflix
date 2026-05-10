import Navbar from "@/components/navbar/Navbar";
import { Box, Container, Flex } from "@chakra-ui/react";
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { useEffect } from "react";

const SignUp = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <Box>
      <Navbar />
      <Container height="min-content" py={2} mt={10}>
        <Flex alignContent="center" justifyContent="center">
          <ClerkSignUp />
        </Flex>
      </Container>
    </Box>
  );
};

export default SignUp;
