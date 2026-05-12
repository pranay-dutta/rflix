import PageHeading from "@/components/common/PageHeading";
import useChangeScrollbarColor from "@/hooks/useChangeScrollbarColor";
import useCustomizationStore from "@/store/customizationStore";
import {
  Box,
  Checkbox,
  Flex,
  Grid,
  Heading,
  HStack,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import CustomizeCardStyle from "./CustomizeCardStyle";
import CustomizeColorPalette from "./CustomizeColorPalette";
import CustomizeCardType from "./CustomizeCardType";

const CustomizePage = () => {
  useChangeScrollbarColor(); //runs useEffect when scrollbar color changes in the store

  const [isLargerThan480] = useMediaQuery(["(min-width: 480px)"]);
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
          {/* Color palette indicator */}
          <Box
            bg={`${activePalette}.500`}
            h="30px"
            w="30px"
            borderRadius="md"
            border="2px solid white"
          />
        </HStack>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          {/* Toggle homepage video */}
          <CustomizationBox heading="Data saving mode">
            <Box onClick={toggleDisableHomepageVideo}>
              <ChakraCheckBox
                label="Disable homepage video"
                checked={disableHomeScreenVideo}
              />
            </Box>
          </CustomizationBox>

          {/* Watch List settings */}
          <CustomizationBox heading="Watch List settings">
            <Flex gap={{ base: 2, md: 10 }} flexDirection={{ base: "column", md: "row" }}>
              <Box onClick={toggleDisableWatchList}>
                <ChakraCheckBox label="Disable Watch List" checked={disableWatchList} />
              </Box>
              <Box onClick={toggleDisableWatchListHomepage}>
                <ChakraCheckBox
                  label="Disable Watch List on homepage"
                  checked={disableWatchListHomepage}
                />
              </Box>
            </Flex>
          </CustomizationBox>

          {/* Color scheme customization */}
          <CustomizationBox heading="Choose color scheme">
            <CustomizeColorPalette />
          </CustomizationBox>

          {/* Card style customization • Visible only on larger screens */}
          {isLargerThan480 && (
            <CustomizationBox heading="Choose card style">
              <CustomizeCardStyle />
            </CustomizationBox>
          )}

          {/* Card type customization */}
          <CustomizationBox heading="Choose card type">
            <CustomizeCardType />
          </CustomizationBox>
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
    <Stack border="1px solid" borderColor="gray.700" borderRadius="md" p={4} gap={4}>
      <Heading color="gray.400">{heading}</Heading>
      {children}
    </Stack>
  );
};

interface Props {
  label: string;
  checked?: boolean;
}

const ChakraCheckBox = ({ label, checked }: Props) => {
  return (
    <Checkbox.Root variant="subtle" checked={checked} _hover={{ cursor: "pointer" }}>
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label fontWeight="normal" fontSize="md">
        {label}
      </Checkbox.Label>
    </Checkbox.Root>
  );
};

export default CustomizePage;
