import useCasts from "@/hooks/useCasts";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { getCreditImage } from "../constants";
import useCustomizationStore from "@/store/customizationStore";
import { MediaScrollHeading } from "../common";
import { BsArrowRight } from "react-icons/bs";

interface Props {
  id: string;
}
const MovieCredits = ({ id }: Props) => {
  const activePalette = useCustomizationStore((s) => s.activePalette);

  const { data } = useCasts(id);
  if (!data) return null;

  const casts = data.cast.slice(0, 13);

  return (
    <>
      <Box my={4}>
        <MediaScrollHeading highlight="Cast">Top Billed Cast</MediaScrollHeading>
      </Box>
      <Flex flexWrap={"wrap"} gap={4}>
        {casts.map((cast) => (
          <Box
            p={2}
            key={cast.id}
            maxW={"154px"}
            backgroundColor={activePalette + ".900/20"}
            borderRadius="md"
          >
            <Image
              width={138}
              borderRadius="sm"
              aspectRatio={2 / 3}
              objectFit="cover"
              src={getCreditImage(cast.profile_path)}
            />
            <Box mt={2}>
              <Text>{cast.name}</Text>
              <Text color="gray.300" fontSize="sm">
                {cast.character}
              </Text>
            </Box>
          </Box>
        ))}

        <Link _hover={{ textDecoration: "none", opacity: 0.8 }} ms={4} alignSelf="center">
          View more <BsArrowRight style={{ marginBottom: "-4px" }} />
        </Link>
      </Flex>
    </>
  );
};

export default MovieCredits;
