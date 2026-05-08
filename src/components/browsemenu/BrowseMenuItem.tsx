import useCustomizationStore from "@/store/customizationStore";
import { VStack, Box, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

interface BrowseMenuItemProps {
  Icon: IconType;
  label: string;
  color?: string;
  link: string;
}
const BrowseMenuItem = ({ Icon, label, color, link }: BrowseMenuItemProps) => {
  const activePalette = useCustomizationStore((s) => s.activePalette);
  const newColor = color || activePalette;
  const navigate = useNavigate();

  return (
    <VStack
      gap={1}
      minW="80px"
      minH="80px"
      justifyContent="center"
      borderRadius="lg"
      borderColor={`${newColor}.900`}
      transition="all 0.3s ease-in-out"
      _hover={{
        borderColor: `${newColor}.800`,
        cursor: "pointer",
        bgColor: "gray.800",
      }}
      onClick={() => navigate(link)}
    >
      <Box
        p={2}
        border="1px solid"
        borderColor="inherit"
        bgColor="gray.950"
        borderRadius="md"
      >
        <Icon color={newColor} size={20} />
      </Box>
      <Text fontSize="x-small">{label}</Text>
    </VStack>
  );
};
export default BrowseMenuItem;
