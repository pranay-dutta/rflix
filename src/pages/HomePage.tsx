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
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

const HomePage = () => {
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
          <Wrapper key={index}>
            <Element />
          </Wrapper>
        ))}
      </Container>
      <Box my={10}>
        <Footer />
      </Box>
    </>
  );
};

const minHeight = {
  base: "320px",
  sm: "257px",
  md: "320px",
  lg: "290px",
  xl: "351px",
  "2xl": "315px",
};
const Wrapper = ({ children }: { children: ReactNode }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: "-100px 0px -20px 0px",
  });

  return (
    <Box ref={ref} my={"10"}>
      {inView ? children : <Box minH={minHeight} />}
    </Box>
  );
};

export default HomePage;
