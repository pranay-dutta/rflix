import { Button } from "@chakra-ui/react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      variant="outline"
      color="gray.400"
      _hover={{ color: "gray.300" }}
    >
      <IoIosArrowRoundBack /> Back
    </Button>
  );
};

export default BackButton;
