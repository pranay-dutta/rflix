import Navbar from "@/components/Navbar";
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
      <Container height="max-content" py={5} mt={20}>
        <Flex alignContent="center" justifyContent="center">
          <ClerkSignUp />
        </Flex>
      </Container>
    </Box>
  );
};

export default SignUp;
