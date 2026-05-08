import { Button } from "@chakra-ui/react";
import { RiHome2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <Button variant="ghost" onClick={() => navigate("/")}>
      <RiHome2Line />
      Home
    </Button>
  );
};
export default HomeButton;
