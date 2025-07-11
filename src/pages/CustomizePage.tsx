import PageHeading from "@/components/common/PageHeading";
import useCustomizationStore from "@/store/customizationStore";
import { Box, Flex, Grid, Heading, HStack, Stack } from "@chakra-ui/react";

const CustomizePage = () => {
  const activePalette = useCustomizationStore((s) => s.activePalette);
  const disableHomeScreenVideo = useCustomizationStore((s) => s.disableHomepageVideo);
  const disableWatchList = useCustomizationStore((s) => s.disableWatchList);
  const disableWatchListHomepage = useCustomizationStore(
    (s) => s.disableWatchListHomepage,
  );

  const toggleDisableHomepageVideo = useCustomizationStore(
    (s) => s.toggleDisableHomepageVideo,
  );
  const toggleDisableWatchList = useCustomizationStore((s) => s.toggleDisableWatchList);
  const toggleDisableWatchListHomepage = useCustomizationStore(
    (s) => s.toggleDisableWatchListHomepage,
  );

  return (
    <>
      <Box mt={3} mb={5}>
        <PageHeading query="Your Experience">Customize Your Experience</PageHeading>
      </Box>

      <Flex direction="column" gap={4}>
        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="md" color="gray.400">
            Active Color Palette
          </Heading>
          <Box
            bg={`${activePalette}.500`}
            h="30px"
            w="30px"
            borderRadius="md"
            border="2px solid white"
          />
        </HStack>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          {customizationBoxHeadings.map((box, index) => (
            <CustomizationBox key={box.heading} heading={box.heading}>
              {/* children of customization box */}
              {index === 0 ? (
                <Box onClick={toggleDisableHomepageVideo}>
                  <ChakraCheckBox
                    label="Disable homepage page video"
                    disabled={disableHomeScreenVideo}
                  />
                </Box>
              ) : index === 1 ? (
                <Flex
                  gap={{ base: 2, md: 10 }}
                  flexDirection={{ base: "column", md: "row" }}
                >
                  <Box onClick={toggleDisableWatchList}>
                    <ChakraCheckBox
                      label="Disable Watch List"
                      disabled={disableWatchList}
                    />
                  </Box>
                  <Box onClick={toggleDisableWatchListHomepage}>
                    <ChakraCheckBox
                      label="Disable Watch List on homepage"
                      disabled={disableWatchListHomepage}
                    />
                  </Box>
                </Flex>
              ) : (
                <ColorPalette />
              )}
            </CustomizationBox>
          ))}
        </Grid>
      </Flex>
    </>
  );
};

interface CustomizationBoxProps {
  heading: string;
  children: ReactNode;
}
const CustomizationBox = ({ heading, children }: CustomizationBoxProps) => {
  return (
    <Stack border="1px solid" borderColor="gray.700" p={4} borderRadius="md" gap={4}>
      <Heading color="gray.400">{heading}</Heading>
      {children}
    </Stack>
  );
};

import { Checkbox } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  label: string;
  disabled?: boolean;
}

const ChakraCheckBox = ({ label, disabled }: Props) => {
  return (
    <Checkbox.Root variant="subtle" checked={disabled} _hover={{ cursor: "pointer" }}>
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label fontWeight="normal" fontSize="md">
        {label}
      </Checkbox.Label>
    </Checkbox.Root>
  );
};

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
const ColorPalette = () => {
  const setAccentColor = useCustomizationStore((s) => s.setAccentColor);
  const activePalette = useCustomizationStore((s) => s.activePalette);
  return (
    <>
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
    </>
  );
};

const customizationBoxHeadings = [
  { heading: "Data saving mode" },
  { heading: "Watch List settings" },
  { heading: "Choose color scheme" },
];

export default CustomizePage;
