import useCustomizationStore from "@/store/customizationStore";
import useWatchListStore from "@/store/watchListStore";
import { Box, Button as ChakraButton } from "@chakra-ui/react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface Props {
  id: number;
  type: "movie" | "tv";
  title: string;
  rating?: number;
  posterPath: string;
  hideBg?: boolean;
}

const WatchListButton = ({ type, id, posterPath, title, rating = 0, hideBg }: Props) => {
  const disableWatchList = useCustomizationStore((state) => state.disableWatchList);
  const inWishlist = useWatchListStore((state) => state.inWatchList(type, id));
  const activePalette = useCustomizationStore((s) => s.activePalette);

  const addToWishlist = useWatchListStore((state) => state.addToWatchList);
  const removeFromWishlist = useWatchListStore((state) => state.removeFromWatchList);

  // If wishlist is not enabled, do not render the button
  if (disableWatchList) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from propagating to the parent element

    if (inWishlist) {
      removeFromWishlist(type, id);
    } else {
      addToWishlist({ id, type, title, posterPath, rating });
    }
  };

  // If hideBg is true, render only the icon without background
  if (hideBg)
    return (
      <Box _hover={{ scale: 1.2, color: "red.600" }} onClick={handleClick}>
        {inWishlist ? <FaBookmark /> : <FaRegBookmark />}
      </Box>
    );

  return (
    <ChakraButton
      paddingX={5}
      paddingY={2}
      backgroundColor="whiteAlpha.200"
      color="whiteAlpha.900"
      background={inWishlist ? `${activePalette}.500` : "whiteAlpha.200"}
      borderRadius="md"
      fontWeight={500}
      _focus={{ outline: "none", boxShadow: "outline" }}
      rounded="md"
      _hover={{ scale: 1.1, opacity: 0.9 }}
      onClick={handleClick}
    >
      {inWishlist ? <FaBookmark /> : <FaRegBookmark />}
      Watch List
    </ChakraButton>
  );
};

export default WatchListButton;
