import Container from "@/components/Container";
import GenreBased from "@/components/genrebased/GenreBased";
import Hero from "@/components/hero/Hero";
import Popular from "@/components/popular/Popular";
import TopRated from "@/components/toprated/TopRated";
import TrendingToday from "@/components/trendingtoday/TrendingToday";
import TrendingWeek from "@/components/trendingweek/TrendingWeek";
import WatchList from "@/components/WatchList";
import WatchProvider from "@/components/watchproviders/WatchProviders";
import useChangeScrollbarColor from "@/hooks/useChangeScrollbarColor";

const HomePage = () => {
  useChangeScrollbarColor(); //runs useEffect when scrollbar color changes in the store

  const SliderElements = [
    WatchList,
    WatchProvider,
    TrendingToday,
    TopRated,
    GenreBased,
    TrendingWeek,
    Popular,
  ];
  return (
    <>
      <Hero />
      <Container
        marginTop={{ base: "0px", md: "-90px" }}
        zIndex={10}
        position="relative"
      >
        {SliderElements.map((Element, index) => (
          <Element key={index} />
        ))}
      </Container>
    </>
  );
};

export default HomePage;
