import { movieAndTvTab } from "@/data";
import useMovieLists from "@/hooks/useMovieLists";
import useTvSeriesLists from "@/hooks/useTvSeriesLists";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Tabs from "../Tabs";
import { MediaScroll } from "../common";

const TopRated = () => {
  const [selectedTab, setSelectedTab] = useState("movies");
  const { data: topRatedMovies, isLoading: isMovieLoading } = useMovieLists(
    "top_rated",
    selectedTab === "movies",
  );
  const { data: topRatedShows, isLoading: isShowLoading } = useTvSeriesLists(
    "top_rated",
    selectedTab === "series",
  );

  const media = selectedTab === "movies" ? topRatedMovies : topRatedShows;
  const isLoading = selectedTab === "movies" ? isMovieLoading : isShowLoading;

  return (
    <>
      <Box mb={3}>
        <Tabs
          tabItems={movieAndTvTab}
          selectedTab={selectedTab}
          heading={"Top Rated"}
          highlight={"Rated"}
          setSelectedTab={setSelectedTab}
        />
      </Box>
      <MediaScroll loading={isLoading} media={media?.pages[0].results} />
    </>
  );
};
export default TopRated;
