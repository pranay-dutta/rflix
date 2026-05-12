import useCustomizationStore from "@/store/customizationStore";
import { Button, Heading, HStack, Span } from "@chakra-ui/react";

const CustomizeCardType = () => {
  const cardType = useCustomizationStore((s) => s.cardType);
  const setCardType = useCustomizationStore((s) => s.setCardType);

  return (
    <HStack
      alignItems={{ smDown: "self-start", md: "center" }}
      justifyContent="space-between"
      h="full"
      gap={2}
    >
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          setCardType(cardType === "descriptive" ? "overlay" : "descriptive")
        }
      >
        Toggle Card Type
      </Button>
      <Heading fontSize="sm">
        <Span color="gray.400">Active:</Span>{" "}
        {cardType[0].toUpperCase() + cardType.slice(1)}
      </Heading>
    </HStack>
  );
};

export default CustomizeCardType;
