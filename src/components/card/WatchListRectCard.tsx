import { Box, Text, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { Image } from "@chakra-ui/react";
import Rating from "../Rating";
import { useNavigate } from "react-router-dom";
import { WatchListItem } from "@/store/watchListStore";
import WatchListButton from "../WatchListButton";

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

const WatchListRectCard = ({ watchListItem }: Props) => {
  const mediaType = watchListItem.mediaType;
  const [imgLoading, setImgLoading] = useState(true);
  const navigate = useNavigate();

  return (
    <Skeleton
      loading={imgLoading}
      aspectRatio={16 / 9}
      overflow="hidden"
      borderRadius="sm"
    >
      <Box position="relative">
        <Image
          onLoad={() => setImgLoading(false)}
          src={watchListItem.rectPosterPath}
          _hover={{ transform: "scale(1.07)" }}
          transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          objectFit="cover"
          aspectRatio={16 / 9}
          cursor="pointer"
          willChange="scale"
          onClick={() => navigate(`/info/${mediaType}/${watchListItem.id}`)}
        />

        {/* Media Type Badge */}
        <Text {...badgeStyles} top={1} right={1}>
          {mediaType === "movie" ? "MOVIE" : "TV SHOW"}
        </Text>

        {/* Rating */}
        <Rating
          pos="absolute"
          top={1}
          left={1}
          {...badgeStyles}
          vote_average={watchListItem.rating}
          fontSize="x-small"
        />

        {/* Watch List add, remove button on the bottom right */}
        <WatchListButton
          bottom={1}
          right={1}
          position="absolute"
          background="blackAlpha.600"
          color="white"
          size="xs"
          {...watchListItem}
          iconOnly
        />
      </Box>
    </Skeleton>
  );
};

export default WatchListRectCard;
