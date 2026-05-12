import { WatchListItem } from "@/store/watchListStore";
import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTMDBImage } from "../constants";
import Gradient from "../Gradient";
import WatchListButton from "../WatchListButton";
import useCustomizationStore from "@/store/customizationStore";
import Skeleton from "../skeleton/Skeleton";
import Rating from "../Rating";

interface Props {
  watchListItem: WatchListItem;
}

const badgeStyles = {
  borderRadius: "sm",
  px: 2,
  py: 0.5,
  fontSize: "x-small",
  color: "white",
  fontWeight: "semibold",
  bg: "blackAlpha.600",
  position: "absolute" as const,
};

const WatchListCard = ({ watchListItem }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [imgLoading, setImgLoading] = useState<boolean>(true);
  const activePalette = useCustomizationStore((s) => s.activePalette);
  const cardType = useCustomizationStore((s) => s.cardType);

  const navigate = useNavigate();
  const path =
    `/info/${watchListItem.mediaType === "movie" ? "movie/" : "tv/"}` + watchListItem.id;

  return (
    <Box
      className="cursor-pointer relative overflow-hidden"
      transition="all 0.3s ease-in-out"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => navigate(path)}
      aspectRatio={2 / 3}
    >
      {/* Image of WatchList card */}
      <Skeleton
        loading={imgLoading}
        position="relative"
        aspectRatio={2 / 3}
        overflow="hidden"
        borderRadius="sm"
      >
        <Image
          borderRadius="sm"
          transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          filter={show && cardType === "overlay" ? "brightness(0.7)" : "brightness(1)"}
          transform={show ? "scale3d(1.04, 1.04, 1)" : "scale3d(1, 1, 1)"}
          willChange="transform, filter"
          src={getTMDBImage(watchListItem.posterPath, "w342", "vertical")}
          alt={watchListItem.title}
          onLoad={() => setImgLoading(false)}
          _placeholder={{ bg: "gray.200" }}
          objectFit="cover"
          loading="lazy"
          aspectRatio={2 / 3}
        />
        {cardType === "overlay" && (
          <Box
            transition="opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            opacity={show ? 0.7 : 0}
          >
            <Gradient.Bottom />
          </Box>
        )}
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
        <Rating
          {...badgeStyles}
          left={1}
          top={0}
          transition="all 0.3s ease-in-out"
          fontSize="x-small"
          vote_average={watchListItem.rating}
        />

        <WatchListButton
          {...watchListItem}
          iconOnly
          iconProps={{
            position: "absolute",
            right: 1,
            top: 0,
          }}
        />
      </HStack>

      {/* Title and Media Type */}
      {cardType === "overlay" && (
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
            {watchListItem.mediaType === "movie" ? "Movie" : "TV Series"}
          </Text>
        </Stack>
      )}
    </Box>
  );
};

export default WatchListCard;
