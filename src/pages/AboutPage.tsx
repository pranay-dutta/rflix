import { Box, Heading, Text, Stack, Alert } from "@chakra-ui/react";
import { FiAlertTriangle } from "react-icons/fi";

const AboutPage = () => {
  return (
    <Box maxW="4xl" mx="auto" mt={5}>
      <Stack gap={6}>
        <Heading as="h1" size="xl" textAlign="center">
          About RFlix
        </Heading>

        <Text fontSize="lg" color="gray.400">
          <strong>RFlix</strong> is a movie browsing web application created for <strong>educational purposes only</strong>.
          It allows users to explore popular, trending, and upcoming movies using publicly available APIs.
        </Text>

        <Text fontSize="lg" color="gray.400">
          This project is part of a personal learning journey in web development, focused on frontend technologies,
          API integration, and UI/UX design. The goal is to practice and showcase development skills.
        </Text>

        <Alert.Root status="warning" variant="subtle" borderRadius="md">
          <Alert.Indicator>
            <FiAlertTriangle />
          </Alert.Indicator>
          <Text fontSize="md">
            RFlix is <strong>not affiliated</strong> with or endorsed by any movie studios or streaming platforms.
            No copyrighted content is stored in our database.
          </Text>
        </Alert.Root>

        <Text fontSize="md" color="gray.400" fontStyle="italic">
          All data displayed is used strictly for learning and demonstration purposes only.
        </Text>
      </Stack>
    </Box>
  );
}

export default AboutPage;
