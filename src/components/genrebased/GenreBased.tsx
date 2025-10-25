import { genreTabs } from "@/data";
import useGenre from "@/hooks/useGenre";
import { useState } from "react";
import Tabs from "../Tabs";
import { MediaScroll } from "../common";
import { Box } from "@chakra-ui/react";

const GenreBased = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>("28"); //Default to Action
  const { data, isLoading } = useGenre(selectedGenre);

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
        <MediaScroll loading={isLoading} media={data?.results} />
      </Box>
    </>
  );
};

export default GenreBased;
