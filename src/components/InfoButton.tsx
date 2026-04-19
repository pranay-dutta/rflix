import useCustomizationStore from "@/store/customizationStore";
import withAlpha from "@/utils/withAlpha";
import { ButtonProps, IconButton } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

interface Props extends ButtonProps {
  children: ReactNode;
  mediaId: number;
  mediaType: "movie" | "tv";
  icon: IconType;
}

const InfoButton = (props: Props) => {
  const { children, mediaId, mediaType, icon: Icon } = props;
  const navigate = useNavigate();
  const activePalette = useCustomizationStore((s) => s.activePalette);

  return (
    <IconButton
      color="white"
      backgroundColor="blackAlpha.600"
      border="1px solid"
      borderRadius="lg"
      borderColor="gray.700"
      rounded="full"
      padding={6}
      _hover={{
        borderColor: `${activePalette}.800`,
        boxShadow: `0px 0px 30px 1px ${withAlpha(activePalette, 0.3)}`,
      }}
      onClick={() => navigate(`/info/${mediaType}/${mediaId}`)}
      {...props}
    >
      <Icon />
      {children}
    </IconButton>
  );
};

export default InfoButton;
