import { Box } from "@chakra-ui/react";
import { SignInButton, UserButton, useSession } from "@clerk/clerk-react";
import { BsPersonFill } from "react-icons/bs";

const LoginButton = () => {
  const { isSignedIn } = useSession();
  if (isSignedIn) return <UserButton  />;

  return (
    <Box cursor="pointer">
      <SignInButton children={<BsPersonFill size={24} />} />
    </Box>
  );
};

export default LoginButton;
