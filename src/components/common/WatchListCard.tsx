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
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => navigate(path)}
    >
      {/* Image of WatchList card */}
      <Skeleton
        loading={imgLoading}
        position="relative"
        maxW="240px"
        maxH="360px"
        overflow="hidden"
        borderRadius="md"
      >
        <Image
          borderRadius="md"
          transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          filter={show ? "brightness(0.7)" : "brightness(1)"}
          transform={show ? "scale3d(1.08, 1.08, 1)" : "scale3d(1, 1, 1)"}
          willChange="transform, filter"
          src={getTMDBImage(watchListItem.posterPath, "w342", "vertical")}
          alt={watchListItem.title}
          onLoad={() => setImgLoading(false)}
          _placeholder={{ bg: "gray.200" }}
          objectFit="cover"
          loading="lazy"
          w="100%"
          h="100%"
        />
        <Box
          transition="opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          opacity={show ? 0.7 : 0}
        >
          <Gradient.Bottom />
          <Gradient.Top />
        </Box>
      </Skeleton>

      {/* Rating and release date*/}
      <HStack
        opacity={show ? 1 : 0}
        transition="opacity 0.3s ease-in-out"
        position="absolute"
        top={2}
        px={2}
        w="full"
        justify="space-between"
      >
        <Rating fontSize="sm" vote_average={watchListItem.rating} />
        <WatchListButton {...watchListItem} hideBg />
      </HStack>
      <Stack
        opacity={show ? 1 : 0}
        transition="all 0.3s ease-in-out"
        position="absolute"
        bottom={1}
        transform={show ? "translateY(-10px)" : "translateY(20px)"}
        w="full"
        px={2}
        gap={1}
      >
        <Text
          fontSize="md"
          fontWeight="semibold"
          textWrap="balance"
          letterSpacing="0.025em"
        >
          {watchListItem.title}
        </Text>
        <Text fontSize="md" fontWeight="semibold" color={`${activePalette}.400`}>
          {watchListItem.type === "movie" ? "Movie" : "TV Series"}
        </Text>
      </Stack>
    </Box>
  );
};

export default WatchListCard;
