import { Box } from "@chakra-ui/react";
import { SignInButton, UserButton, useSession } from "@clerk/clerk-react";
import { LuUser } from "react-icons/lu";

const LoginButton = () => {
  const { isSignedIn } = useSession();
  if (isSignedIn) return <UserButton />;

  return (
    <Box cursor="pointer">
      <SignInButton children={<LuUser size={24} />} />
    </Box>
  );
};

export default LoginButton;
