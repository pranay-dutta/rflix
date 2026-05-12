import useCustomizationStore from "@/store/customizationStore";
import { Box, Grid } from "@chakra-ui/react";

const colorPalettes = [
  "red",
  "gray",
  "pink",
  "purple",
  "cyan",
  "blue",
  "teal",
  "green",
  "yellow",
  "orange",
];

const CustomizeColorPalette = () => {
  const setAccentColor = useCustomizationStore((s) => s.setAccentColor);
  const activePalette = useCustomizationStore((s) => s.activePalette);
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4}>
      {colorPalettes.map((color) => (
        <Box
          key={color}
          bg={`${color}.500`}
          h="50px"
          borderRadius="md"
          border={color === activePalette ? "2px solid white" : "none"}
          opacity={color === activePalette ? 1 : 0.7}
          _hover={{ cursor: "pointer", transform: "scale(1.03)" }}
          onClick={() => setAccentColor(color)}
          transition="transform 0.2s ease-in-out"
        />
      ))}
    </Grid>
  );
};
export default CustomizeColorPalette;
