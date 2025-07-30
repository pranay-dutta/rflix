import { getTMDBImage } from "@/components/constants";
import { Box, Image } from "@chakra-ui/react";
import Gradient from "../Gradient";

const MediaPoster = ({ backdrop_path }: { backdrop_path: string }) => {
  return (
    <Box className="opacity-50 hidden! md:block! rounded-lg">
      <Image
        height="80vh"
        w="full"
        className="opacity-70 w-full rounded-md object-cover"
        src={getTMDBImage(backdrop_path, "original", "horizontal")}
        loading="lazy"
      />
      <Gradient.Bottom />
    </Box>
  );
};
export default MediaPoster;
