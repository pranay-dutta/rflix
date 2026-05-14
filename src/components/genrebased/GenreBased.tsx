import { genreTabs } from "@/data";
import useGenre from "@/hooks/useGenre";
import {  useState } from "react";
import Tabs from "../Tabs";
import { Box, useMediaQuery } from "@chakra-ui/react";
import RectMediaScroll from "@/components/scroll/RectMediaScroll";
import useCustomizationStore from "@/store/customizationStore";
import { VerticalMediaScroll } from "../common";

const GenreBased = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>("28"); //Default to Action
  const { data, isLoading } = useGenre(selectedGenre);
  const cardStyle = useCustomizationStore((s) => s.cardStyle);
  const [isLargerThan480] = useMediaQuery(["(min-width: 480px)"]);

  return (
    <>
      <Tabs
        tabItems={genreTabs}
        heading={"Browse by Genre"}
        highlight={"Genre"}
        selectedTab={selectedGenre}
        setSelectedTab={setSelectedGenre}
      />
      <Box my={3}>
        {cardStyle === "horizontal" && isLargerThan480 ? (
          <RectMediaScroll media={data?.results} loading={isLoading} />
        ) : (
          <VerticalMediaScroll media={data?.results} loading={isLoading} />
        )}
      </Box>
    </>
  );
};

export default GenreBased;
