import { movieAndTvTab } from "@/data";
import useMovieLists from "@/hooks/useMovieLists";
import useTvSeriesLists from "@/hooks/useTvSeriesLists";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { MediaScroll } from "../common";
import Tabs from "../Tabs";

const Popular = () => {
  const [selectedTab, setSelectedTab] = useState("movies");
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
        <MediaScroll loading={isLoading} media={media?.pages[0].results} />
      </Box>
    </>
  );
};

export default Popular;
