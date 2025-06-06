import { Heading, Highlight } from "@chakra-ui/react";

interface Props {
  children: string;
  highlight: string;
}

const MediaScrollHeading = ({ children, highlight }: Props) => {
  return (
    <Heading fontSize="2xl" fontWeight="bold" filter="contrast(2)">
      <Highlight query={highlight} styles={{ color: "purple.400" }}>
        {children}
      </Highlight>
    </Heading>
  );
};

export default MediaScrollHeading;
