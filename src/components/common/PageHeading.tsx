import useCustomizationStore from "@/store/customizationStore";
import { Heading, Highlight } from "@chakra-ui/react";

interface Props {
  query: string;
  children: string;
}

const PageHeading = ({ query, children }: Props) => {
  const activePalette = useCustomizationStore((s) => s.activePalette);
  return (
    <Heading size="3xl" as={"h1"}>
      <Highlight query={query} styles={{ color: `${activePalette}.400` }}>
        {children}
      </Highlight>
    </Heading>
  );
};
export default PageHeading;
