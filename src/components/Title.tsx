import useCustomizationStore from "@/store/customizationStore";
import { Box, Heading, Highlight, Image } from "@chakra-ui/react";
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
      <Image src={`/${activePalette}.ico`} w={5} h={5} />

      <Heading fontSize="xl" fontWeight="bold">
        <Highlight styles={{ color: `${activePalette}.400` }} query="lix">
          Rflix
        </Highlight>
      </Heading>
    </Box>
  );
};
export default Title;
