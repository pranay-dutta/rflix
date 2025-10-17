import useCredits from "@/hooks/useCredits";
import { Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { getCreditImage } from "../constants";
import useCustomizationStore from "@/store/customizationStore";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  mediaId: string;
  isTvShow: boolean;
}
const Credits = ({ mediaId, isTvShow }: Props) => {
  const CAST_SIZE = 7;
  const activePalette = useCustomizationStore((s) => s.activePalette);

  const { data } = useCredits(mediaId, isTvShow);
  if (!data || !data.cast.length)
    return (
      <Text color={`${activePalette}.400/90`}>Credit information is not available.</Text>
    );

  const casts = data.cast.slice(0, CAST_SIZE);

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

        {data.cast.length > CAST_SIZE && (
          <Link
            to={`/cast/${mediaId}`}
            state={{ isTvShow }}
            style={{ textDecoration: "none", marginLeft: "16px", alignSelf: "center" }}
          >
            <Text _hover={{ opacity: 0.8 }} cursor="pointer">
              View more{" "}
              <BsArrowRight style={{ marginBottom: "-1px", display: "inline" }} />
            </Text>
          </Link>
        )}
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
