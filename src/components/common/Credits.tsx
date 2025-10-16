import useCasts from "@/hooks/useCasts";
import { Box, Flex, Image, Link, Skeleton, Text } from "@chakra-ui/react";
import { getCreditImage } from "../constants";
import useCustomizationStore from "@/store/customizationStore";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";

interface Props {
  mediaId: string;
  isTvShow: boolean;
}
const Credits = ({ mediaId, isTvShow }: Props) => {
  const activePalette = useCustomizationStore((s) => s.activePalette);

  const { data } = useCasts(mediaId, isTvShow);
  if (!data) return null;

  const casts = data.cast.slice(0, 13);

  return (
    <Box>
      <Flex flexWrap={"wrap"} gap={4}>
        {casts.map((cast) => (
          <Box
            p={2}
            key={cast.id}
            maxW={"154px"}
            backgroundColor={activePalette + ".900/20"}
            borderRadius="md"
          >
            <PersonImage profilePath={cast.profile_path} />
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
    </Box>
  );
};

const PersonImage = ({ profilePath }: { profilePath: string }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Skeleton loading={isLoading}>
      <Image
        width={138}
        borderRadius="sm"
        aspectRatio={2 / 3}
        objectFit="cover"
        onLoad={() => setLoading(false)}
        src={getCreditImage(profilePath)}
      />
    </Skeleton>
  );
};

export default Credits;
