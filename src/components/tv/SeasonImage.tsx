import { Episode } from "@/interfaces/Season";
import { Badge, Box, Image } from "@chakra-ui/react";
import { useState } from "react";
import { RiMovieLine } from "react-icons/ri";
import { getTMDBImage } from "../constants";
import Skeleton from "../skeleton/Skeleton";

const SeasonImage = ({ episode }: { episode: Episode }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box position="relative">
      <Skeleton loading={!loaded} borderRadius="md">
        <Image
          src={getTMDBImage(episode.still_path, "w500", "horizontal")}
          alt={episode.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          w={{ base: "full", md: "350px" }}
          aspectRatio={12 / 7}
          objectFit="cover"
          borderRadius="md"
        />
      </Skeleton>

      <Badge size="md" variant="surface" position="absolute" top={2} left={2}>
        <RiMovieLine />
        {episode.episode_number}
      </Badge>
    </Box>
  );
};

export default SeasonImage;
