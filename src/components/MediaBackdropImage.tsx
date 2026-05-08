import { getTMDBImage } from "./constants";
import { Image } from "@chakra-ui/react";

const MediaBackdropImage = ({ path }: { path: string }) => {
  return (
    <>
      <Image
        className="w-full object-cover"
        src={getTMDBImage(path, "original", "horizontal")}
        filter="brightness(90%) "
        alt="Media Backdrop"
        w="100%"
        h="100%"
        loading="lazy"
      />
    </>
  );
};

export default MediaBackdropImage;
