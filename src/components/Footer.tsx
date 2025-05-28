import { Text } from "@chakra-ui/react";

const Footer = () => {
  const date = new Date();
  return (
    <footer className="py-3 text-center text-gray-400">
      <Text>
        This site does not store any files on it's server, we only link to the media which
        is hosted on 3rd party services.
      </Text>
      <Text>&copy; {date.getFullYear()} Rflix. All rights reserved. </Text>
    </footer>
  );
};

export default Footer;
