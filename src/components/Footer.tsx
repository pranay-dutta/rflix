import { Link, Span, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  const date = new Date();
  return (
    <footer className="text-center text-gray-400">
      <Text>
        Made with &#10084; by Pranay Dutta. You can find the source code here
        <Link
          href="https://github.com/pranay-dutta/rflix"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Span
            ml={1}
            _hover={{ color: "white" }}
            transform={"translateY(2px)"}
            className="inline-flex items-center"
          >
            <FaGithub />
          </Span>
        </Link>
      </Text>
      <Text>&copy; {date.getFullYear()} Rflix. All rights reserved. </Text>
    </footer>
  );
};

export default Footer;
