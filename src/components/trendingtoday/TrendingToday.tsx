import { movieAndTvTab } from "@/data";
import useTrending from "@/hooks/useTrending";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { MediaScroll } from "../common";
import Tabs from "../Tabs";

const TrendingToday = () => {
  const [selectedTab, setSelectedTab] = useState("movies");
  const { data: trendingMoviesToday, isLoading: isMovieLoading } = useTrending(
    "movie",
    "day",
    selectedTab === "movies",
  );
  const { data: trendingShowsToday, isLoading: isShowLoading } = useTrending(
    "tv",
    "day",
    selectedTab === "series",
  );

  const media =
    selectedTab === "movies" ? trendingMoviesToday?.results : trendingShowsToday?.results;
  const isLoading = selectedTab === "movies" ? isMovieLoading : isShowLoading;

  return (
    <>
      <Box mb={3}>
        <Tabs
          tabItems={movieAndTvTab}
          heading={"Trending Today"}
          highlight={"Today"}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </Box>
      <MediaScroll loading={isLoading} media={media} />
    </>
  );
};
export default TrendingToday;
