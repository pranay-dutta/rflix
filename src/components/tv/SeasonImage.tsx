import { Badge, Box, Image } from "@chakra-ui/react";
import { RiMovieLine } from "react-icons/ri";
import { getPlaceHolder, getTMDBImage } from "../constants";
import { Episode } from "@/interfaces/Season";

const SeasonImage = ({ episode }: { episode: Episode }) => {
  return (
    <Box position="relative">
      <Image
        maxW={{ base: "full", md: "350px" }}
        objectFit="cover"
        borderRadius="md"
        src={
          episode.still_path
            ? getTMDBImage(episode.still_path, "w500")
            : getPlaceHolder("original")
        }
      />

      <Badge size="md" variant="surface" position="absolute" top={2} left={2}>
        <RiMovieLine />
        {episode.episode_number}
      </Badge>
    </Box>
  );
};
export default SeasonImage;
