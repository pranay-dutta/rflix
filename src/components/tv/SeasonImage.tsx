import { Badge, Box, Image } from "@chakra-ui/react";
import { RiMovieLine } from "react-icons/ri";
import { getTMDBImage } from "../constants";
import { Episode } from "@/interfaces/Season";

const SeasonImage = ({ episode }: { episode: Episode }) => {
  return (
    <Box position="relative">
      <Image
        className="object-cover rounded-md"
        w={{ base: "full", md: "350px" }}
        aspectRatio={12 / 7}
        objectFit="cover"
        src={getTMDBImage(episode.still_path, "w500", "horizontal")}
      />

      <Badge size="md" variant="surface" position="absolute" top={2} left={2}>
        <RiMovieLine />
        {episode.episode_number}
      </Badge>
    </Box>
  );
};
export default SeasonImage;
