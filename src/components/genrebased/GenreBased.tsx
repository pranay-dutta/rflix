import { genreTabs } from "@/data";
import useGenre from "@/hooks/useGenre";
import { useState } from "react";
import Tabs from "../Tabs";
import { Box } from "@chakra-ui/react";
import RectMediaScroll from "../card/RectMediaScroll";
import useCustomizationStore from "@/store/customizationStore";
import { MediaScroll } from "../common";

const GenreBased = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>("28"); //Default to Action
  const { data, isLoading } = useGenre(selectedGenre);
  const cardStyle = useCustomizationStore((s) => s.cardStyle);

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
        {cardStyle === "vertical" ? (
          <MediaScroll media={data?.results} loading={isLoading} />
        ) : (
          <RectMediaScroll media={data?.results} loading={isLoading} />
        )}
      </Box>
    </>
  );
};

export default GenreBased;
