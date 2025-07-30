import { Badge, Image, Skeleton } from "@chakra-ui/react";
import { RiMovieLine } from "react-icons/ri";
import { getTMDBImage } from "../constants";
import { Episode } from "@/interfaces/Season";
import { useState } from "react";

const SeasonImage = ({ episode }: { episode: Episode }) => {
  const [imgLoading, setImgLoading] = useState<boolean>(true);

  return (
    <Skeleton loading={imgLoading} position="relative">
      <Image
        className="object-cover rounded-md"
        w={{ base: "full", md: "350px" }}
        maxW={{ base: "full", md: "350px" }}
        aspectRatio={12 / 7}
        objectFit="cover"
        src={getTMDBImage(episode.still_path, "w500", "horizontal")}
        loading="lazy"
        onLoad={() => setImgLoading(false)}
        alt={episode.name}
      />

      <Badge size="md" variant="surface" position="absolute" top={2} left={2}>
        <RiMovieLine />
        {episode.episode_number}
      </Badge>
    </Skeleton>
  );
};
export default SeasonImage;
