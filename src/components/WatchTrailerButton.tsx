import useCustomizationStore from "@/store/customizationStore";
import withAlpha from "@/utils/withAlpha";
import { ButtonProps, IconButton } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

interface WatchButtonProps extends ButtonProps {
  children: ReactNode;
  mediaId: number;
  mediaType: "movie" | "tv";
  icon: IconType;
}

const WatchTrailerButton = (props: WatchButtonProps) => {
  const { children, mediaId, mediaType, icon: Icon } = props;
  const activePalette = useCustomizationStore((s) => s.activePalette);
  const navigate = useNavigate();

  const path = mediaType == "tv" ? `watch/tv/${mediaId}/1/1` : `watch/movie/${mediaId}`;

  return (
    <IconButton
      color="black"
      backgroundColor="white"
      border="1px solid"
      borderRadius="lg"
      rounded="full"
      _hover={{ boxShadow: `0px 0px 30px 1px ${withAlpha(activePalette, 0.3)}` }}
      onClick={() => navigate(path)}
      padding={{ base: 5, md: 6 }}
      size={{ base: "xs", md: "sm" }}
      {...props}
    >
      <Icon />
      {children}
    </IconButton>
  );
};

export default WatchTrailerButton;
