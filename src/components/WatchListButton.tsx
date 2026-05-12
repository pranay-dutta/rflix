import useCustomizationStore from "@/store/customizationStore";
import useWatchListStore from "@/store/watchListStore";
import { Box, Button } from "@chakra-ui/react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import type { BoxProps, ButtonProps } from "@chakra-ui/react";

interface Props {
  id: string;
  mediaType: "movie" | "tv";
  title: string;
  rating: number;
  posterPath: string;
  rectPosterPath: string;
  iconOnly?: boolean;
  iconProps?: BoxProps;
}

type WatchListButtonProps = Props & ButtonProps;

const WatchListButton = (props: WatchListButtonProps) => {
  const {
    id,
    mediaType,
    title,
    rating,
    posterPath,
    rectPosterPath,
    iconOnly,
    iconProps,
    ...rest
  } = props;

  const disableWatchList = useCustomizationStore((state) => state.disableWatchList);
  const inWishlist = useWatchListStore((state) => state.inWatchList(mediaType, id));
  const activePalette = useCustomizationStore((s) => s.activePalette);

  const addToWishlist = useWatchListStore((state) => state.addToWatchList);
  const removeFromWishlist = useWatchListStore((state) => state.removeFromWatchList);

  // If wishlist is not enabled, do not render the button
  if (disableWatchList) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from propagating to the parent element

    if (inWishlist) {
      removeFromWishlist(mediaType, id);
    } else {
      addToWishlist({
        id,
        mediaType,
        title,
        posterPath,
        rating,
        rectPosterPath,
      });
    }
  };

  // If iconOnly is true, render only the icon without background
  //TODO: fix the consistency of props
  if (iconOnly)
    return (
      <Box
        px={1}
        py={1}
        borderRadius="sm"
        backgroundColor="blackAlpha.600"
        onClick={handleClick}
        {...iconProps}
        color="white"
        _hover={{ color: "red.600" }} //color will not be inherited
      >
        {inWishlist ? <FaBookmark size="12px" /> : <FaRegBookmark size="12px" />}
      </Box>
    );

  return (
    <Button
      paddingX={5}
      paddingY={2}
      backgroundColor="whiteAlpha.200"
      color="whiteAlpha.900"
      background={inWishlist ? `${activePalette}.500` : "whiteAlpha.200"}
      borderRadius="md"
      fontWeight={500}
      _focus={{ outline: "none", boxShadow: "outline" }}
      fontSize="sm"
      rounded="md"
      _hover={{ scale: 1.1, opacity: 0.9 }}
      onClick={handleClick}
      {...rest}
    >
      {inWishlist ? <FaBookmark /> : <FaRegBookmark />}
      Watch List
    </Button>
  );
};

export default WatchListButton;
