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

  return (
    <IconButton
      color="black"
      backgroundColor="white"
      border="1px solid"
      borderRadius="lg"
      rounded="full"
      padding={6}
      _hover={{ boxShadow: `0px 0px 30px 1px ${withAlpha(activePalette, 0.3)}` }}
      onClick={() => navigate(`/watch/${mediaType}/${mediaId}`)}
      {...props}
    >
      <Icon />
      {children}
    </IconButton>
  );
};

export default WatchTrailerButton;
