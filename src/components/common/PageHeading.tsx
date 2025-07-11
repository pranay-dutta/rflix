import { Heading, Highlight } from "@chakra-ui/react";

interface Props {
  query: string;
  children: string;
}

const PageHeading = ({ query, children }: Props) => {
  return (
    <Heading size="3xl" as={"h1"}>
      <Highlight query={query} styles={{ color: "purple.400" }}>
        {children}
      </Highlight>
    </Heading>
  );
};
export default PageHeading;
