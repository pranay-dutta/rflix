import { Button } from "@chakra-ui/react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      colorPalette="blackAlpha"
      variant="outline"
    >
      <RiArrowLeftLine /> Back
    </Button>
  );
};

export default BackButton;
