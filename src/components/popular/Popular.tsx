import { movieAndTvTab } from "@/data";
import useMovieLists from "@/hooks/useMovieLists";
import useTvSeriesLists from "@/hooks/useTvSeriesLists";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { MediaScroll } from "../common";
import Tabs from "../Tabs";
import useCustomizationStore from "@/store/customizationStore";
import RectMediaScroll from "../card/RectMediaScroll";

const Popular = () => {
  const [selectedTab, setSelectedTab] = useState("movies");
  const cardStyle = useCustomizationStore((s) => s.cardStyle);

  const { data: popularMovies, isLoading: isMovieLoading } = useMovieLists(
    "popular",
    selectedTab === "movies",
  );
  const { data: popularShows, isLoading: isShowLoading } = useTvSeriesLists(
    "popular",
    selectedTab === "series",
  );
  const media = selectedTab === "movies" ? popularMovies : popularShows;
  const isLoading = selectedTab === "movies" ? isMovieLoading : isShowLoading;

  return (
    <>
      <Tabs
        tabItems={movieAndTvTab}
        selectedTab={selectedTab}
        heading={"Popular"}
        highlight={"Popular"}
        setSelectedTab={setSelectedTab}
      />
      <Box my={3}>
        {cardStyle === "vertical" ? (
          <MediaScroll media={media?.pages[0].results} loading={isLoading} />
        ) : (
          <RectMediaScroll media={media?.pages[0].results} loading={isLoading} />
        )}
      </Box>
    </>
  );
};

export default Popular;
