import { movieAndTvTab } from "@/data";
import useTrending from "@/hooks/useTrending";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { MediaScroll } from "../common";
import Tabs from "../Tabs";
import useCustomizationStore from "@/store/customizationStore";
import RectMediaScroll from "@/components/scroll/RectMediaScroll";

const TrendingWeek = () => {
  const [selectedTab, setSelectedTab] = useState("movies");
  const cardStyle = useCustomizationStore((s) => s.cardStyle);

  const { data: trendingMoviesWeek, isLoading: isMovieLoading } = useTrending(
    "movie",
    "week",
    selectedTab === "movies",
  );
  const { data: trendingShowsWeek, isLoading: isShowLoading } = useTrending(
    "tv",
    "week",
    selectedTab === "series",
  );

  const media =
    selectedTab === "movies" ? trendingMoviesWeek?.results : trendingShowsWeek?.results;
  const isLoading = selectedTab === "movies" ? isMovieLoading : isShowLoading;

  return (
    <>
      <Tabs
        tabItems={movieAndTvTab}
        heading={"Week's Trends"}
        highlight={"Trends"}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Box my={3}>
        {cardStyle === "vertical" ? (
          <MediaScroll media={media} loading={isLoading} />
        ) : (
          <RectMediaScroll media={media} loading={isLoading} />
        )}
      </Box>
    </>
  );
};
export default TrendingWeek;
