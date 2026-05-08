import useCustomizationStore from "@/store/customizationStore";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Title = () => {
  const navigate = useNavigate();
  const activePalette = useCustomizationStore((s) => s.activePalette);

  return (
    <Box
      display="flex"
      alignItems="center"
      onClick={() => navigate("/")}
      gap={1}
      cursor="pointer"
      userSelect="none"
    >
      <Flex align="center" gap={2}>
        <Image src={`/${activePalette}.ico`} w={6} h={6} borderRadius="sm" />
        <Heading fontSize="2xl" fontWeight="bold">
          Rflix
        </Heading>
      </Flex>
    </Box>
  );
};
export default Title;
