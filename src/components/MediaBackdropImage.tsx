import { getTMDBImage } from "./constants";
import { Image } from "@chakra-ui/react";

const MediaBackdropImage = ({ path }: { path: string }) => {
  return (
    <Image
      className="w-full object-cover"
      src={getTMDBImage(path, "original", "horizontal")}
      filter="contrast(110%) brightness(70%) "
      alt="Media Backdrop"
      w="100%"
      h="100%"
      loading="lazy"
    />
  );
};

export default MediaBackdropImage;
