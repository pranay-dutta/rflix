import Container from "@/components/Container";
import Footer from "@/components/Footer";
import GenreBased from "@/components/genrebased/GenreBased";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Popular from "@/components/popular/Popular";
import TopRated from "@/components/toprated/TopRated";
import TrendingToday from "@/components/trendingtoday/TrendingToday";
import TrendingWeek from "@/components/trendingweek/TrendingWeek";
import WatchList from "@/components/WatchList";
import WatchProvider from "@/components/watchproviders/WatchProviders";
import useCustomizationStore from "@/store/customizationStore";
import { useEffect } from "react";

const HomePage = () => {
  const activePalette = useCustomizationStore((s) => s.activePalette);

  //change scrollbar color to match active palette
  useEffect(() => {
    document.documentElement.style.setProperty("--scrollbar-color", activePalette);
  }, [activePalette]);

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
      <Navbar />
      <Hero />
      <Container marginTop={{ base: "0px", md: "-90px" }} zIndex={10} position="relative">
        {SliderElements.map((Element, index) => (
          <Element key={index} />
        ))}
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
