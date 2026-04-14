import { Box, Text, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { Image } from "@chakra-ui/react";
import useRectPoster from "@/hooks/useRectPoster";
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
  const mediaType = watchListItem.type;

  const [imgLoading, setImgLoading] = useState(true);
  const { data: rectPosterPath, isLoading } = useRectPoster(watchListItem.id, mediaType);
  const navigate = useNavigate();

  return (
    <Skeleton
      loading={imgLoading || isLoading}
      aspectRatio={16 / 9}
      overflow="hidden"
      borderRadius="sm"
    >
      <Box position="relative">
        <Image
          onLoad={() => setImgLoading(false)}
          src={rectPosterPath}
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
        <Text {...badgeStyles} top={1} left={1}>
          <Rating vote_average={watchListItem.rating} fontSize="x-small" />
        </Text>

        {/* Watch List add, remove button */}
        <Text {...badgeStyles} bottom={1} right={1} cursor="pointer">
          <WatchListButton {...watchListItem} iconOnly />
        </Text>
      </Box>
    </Skeleton>
  );
};

export default WatchListRectCard;
