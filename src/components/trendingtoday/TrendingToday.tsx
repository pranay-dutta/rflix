import { movieAndTvTab } from "@/data";
import useTrending from "@/hooks/useTrending";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { MediaScroll } from "../common";
import Tabs from "../Tabs";
import RectMediaScroll from "../card/RectMediaScroll";
import useCustomizationStore from "@/store/customizationStore";

const TrendingToday = () => {
  const [selectedTab, setSelectedTab] = useState("movies");
  const cardStyle = useCustomizationStore((s) => s.cardStyle);

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

      {cardStyle === "vertical" ? (
        <MediaScroll media={media} loading={isLoading} />
      ) : (
        <RectMediaScroll media={media} loading={isLoading} />
      )}
    </>
  );
};
export default TrendingToday;
