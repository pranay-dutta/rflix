import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Box, Flex, Text } from "@chakra-ui/react";
import { MediaScroll, MediaScrollHeading } from "@/components/common";
// import isMovie from "@/utils/isMovie";
import AiRecommended from "@/components/AiRecommended";
// import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
// import { useHomeData } from "@/hooks/useHomeData";
// import { useInView } from "react-intersection-observer";
import useWatchListStore from "@/store/watchListStore";
import useCustomizationStore from "@/store/customizationStore";
import { Link } from "react-router-dom";
import WatchProviderContainer from "@/components/watchproviders/container/WatchProviderContainer";
import useTrending from "@/hooks/useTrending";
import Tabs, { TabItem } from "@/components/Tabs";
import useMovieLists from "@/hooks/useMovieLists";
import useTvSeriesLists from "@/hooks/useTvSeriesLists";
import Container from "@/components/Container";

const HomePage = () => {
  const watchList = useWatchListStore((s) => s.watchList);
  const watchListItems = [...watchList.values()].reverse();
  const disableWatchListHomepage = useCustomizationStore(
    (s) => s.disableWatchListHomepage,
  );

  return (
    <>
      <Navbar />
      <Hero />
      <Container>
        <Box className="md:-mt-10! z-10 relative">
          {/* {watchList.size > 0 && !disableWatchListHomepage && (
            <Box>
              <Flex mb={3} justifyContent="space-between">
                <MediaScrollHeading highlight={"Watch List"}>
                  Your Watch List
                </MediaScrollHeading>
                <Link to="/watchlist">
                  <Text fontSize="md">View all</Text>
                </Link>
              </Flex>
              <MediaScroll loop={false} watchListItems={watchListItems} />
            </Box>
          )} */}

          <WatchProviderContainer />

          <TrendingToday />
          <TopRated />
          <TrendingWeek />
          {/* <AiRecommended /> */}
          <Popular />
        </Box>
        <Footer />
      </Container>
    </>
  );
};

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
  const tabItems: TabItem[] = [
    { value: "movies", label: "Movies", color: "red.500" },
    { value: "series", label: "Series", color: "blue.500" },
  ];
  const media = selectedTab === "movies" ? popularMovies : popularShows;
  const isLoading = selectedTab === "movies" ? isMovieLoading : isShowLoading;

  return (
    <>
      <Box mb={3}>
        <Tabs
          tabItems={tabItems}
          selectedTab={selectedTab}
          heading={"Popular"}
          highlight={"Popular"}
          setSelectedTab={setSelectedTab}
        />
      </Box>
      <MediaScroll loading={isLoading} media={media?.pages[0].results} />
    </>
  );
};

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
  const tabItems: TabItem[] = [
    { value: "movies", label: "Movies", color: "red.500" },
    { value: "series", label: "Series", color: "blue.500" },
  ];

  const media = selectedTab === "movies" ? topRatedMovies : topRatedShows;
  const isLoading = selectedTab === "movies" ? isMovieLoading : isShowLoading;

  return (
    <>
      <Box mb={3}>
        <Tabs
          tabItems={tabItems}
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

  const tabItems: TabItem[] = [
    { value: "movies", label: "Movies", color: "red.500" },
    { value: "series", label: "Series", color: "blue.500" },
  ];
  const media =
    selectedTab === "movies" ? trendingMoviesToday?.results : trendingShowsToday?.results;
  const isLoading = selectedTab === "movies" ? isMovieLoading : isShowLoading;

  return (
    <>
      <Box mb={3}>
        <Tabs
          tabItems={tabItems}
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

const TrendingWeek = () => {
  const [selectedTab, setSelectedTab] = useState("movies");
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

  const tabItems: TabItem[] = [
    { value: "movies", label: "Movies", color: "red.500" },
    { value: "series", label: "Series", color: "blue.500" },
  ];
  const media =
    selectedTab === "movies" ? trendingMoviesWeek?.results : trendingShowsWeek?.results;
  const isLoading = selectedTab === "movies" ? isMovieLoading : isShowLoading;

  return (
    <>
      <Box mb={3}>
        <Tabs
          tabItems={tabItems}
          heading={"Trending This Week"}
          highlight={"Week"}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </Box>
      <MediaScroll loading={isLoading} media={media} />
    </>
  );
};

// interface Props {
//   children: ReactNode;
//   isWatchList?: boolean;
// }

// const Wrapper = ({ children, isWatchList }: Props) => {
//   const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
//   const activePalette = useCustomizationStore((s) => s.activePalette);

//   return (
//     <Skeleton
//       ref={ref}
//       loading={!inView}
//       my={5}
//       background="gray.950"
//       bgImage={
//         isWatchList ? `radial-gradient(circle, #000 45%, ${activePalette} 300%)` : "none"
//       }
//       borderWidth="1px"
//       borderRadius="10px"
//       px={{ lg: 10, base: 5 }}
//       py={{ lg: 8, base: 5 }}
//     >
//       {inView ? children : <Box minH={"330px"} />}
//     </Skeleton>
//   );
// };

export default HomePage;
