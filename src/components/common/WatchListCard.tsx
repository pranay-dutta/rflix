import useCustomizationStore from "@/store/customizationStore";
import { WatchListItem } from "@/store/watchListStore";
import { Box, HStack, Image, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTMDBImage } from "../constants";
import Gradient from "../Gradient";
import Rating from "../Rating";
import WatchListButton from "../WatchListButton";

interface Props {
  watchListItem: WatchListItem;
}

const WatchListCard = ({ watchListItem }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [imgLoading, setImgLoading] = useState<boolean>(true);
  const activePalette = useCustomizationStore((s) => s.activePalette);

  const navigate = useNavigate();
  const path =
    `/info/${watchListItem.type === "movie" ? "movie/" : "tv/"}` + watchListItem.id;

  return (
    <Box
      className="cursor-pointer relative overflow-hidden"
      borderRadius="md"
      transition="all 0.3s ease-in-out"
      _hover={{ transform: "translateY(-8px)" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => navigate(path)}
    >
      {/* Image of movie card */}
      <Skeleton loading={imgLoading} position="relative" maxW="240px" maxH="360px">
        <Image
          borderRadius="md"
          transition="filter 0.3s ease-in-out"
          filter={show ? "brightness(0.8)" : "brightness(1)"}
          src={getTMDBImage(watchListItem.posterPath, "w342", "vertical")}
          alt={watchListItem.title}
          onLoad={() => setImgLoading(false)}
          objectFit="cover"
          loading="lazy"
          w="100%"
          h="100%"
        />
        <Box transition="opacity 0.3s ease-in-out" opacity={show ? 0.8 : 0}>
          <Gradient.Bottom />
          <Gradient.Top />
        </Box>
      </Skeleton>

      {/* Movie card rating and release date*/}
      <HStack
        opacity={show ? 1 : 0}
        transition="opacity 0.3s ease-in-out"
        position="absolute"
        top={4}
        px={2}
        w="full"
        justify="space-between"
      >
        <Rating vote_average={watchListItem.rating} />
        <WatchListButton {...watchListItem} hideBg />
      </HStack>
      <Stack
        opacity={show ? 1 : 0}
        transition="opacity 0.3s ease-in-out"
        position="absolute"
        bottom={6}
        zIndex={20}
        px={2}
        w="full"
      >
        <Text fontSize="md" fontWeight="medium" lineClamp="1">
          {watchListItem.title}
        </Text>
        <Text fontSize="lg" fontWeight="medium" color={`${activePalette}.400`}>
          {watchListItem.type === "movie" ? "Movie" : "TV Series"}
        </Text>
      </Stack>
    </Box>
  );
};

export default WatchListCard;
