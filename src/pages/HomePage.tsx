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
import { Box } from "@chakra-ui/react";
import { memo, type ComponentType } from "react";
import { useInView } from "react-intersection-observer";

interface DeferredHomeSectionProps {
  Section: ComponentType;
  eager?: boolean;
}

const DeferredHomeSection = memo(
  ({ Section, eager = false }: DeferredHomeSectionProps) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      rootMargin: "700px 0px",
    });

    const shouldRender = eager || inView;

    return (
      <Box
        ref={ref}
        mb={{ smDown: 10, md: 10, lg: 20 }}
        minH={{
          base: shouldRender ? "auto" : "260px",
          md: shouldRender ? "auto" : "320px",
        }}
      >
        {shouldRender ? <Section /> : null}
      </Box>
    );
  },
);

DeferredHomeSection.displayName = "DeferredHomeSection";

const HomePage = () => {
  useChangeScrollbarColor(); //runs useEffect when scrollbar color changes in the store

  const SliderElements = [
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
        marginTop={{ base: "50px", md: "-90px" }}
        zIndex={10}
        position="relative"
      >
        <WatchList />
        {SliderElements.map((Element, index) => (
          <DeferredHomeSection key={index} Section={Element} eager={index < 1} />
        ))}
      </Container>
    </>
  );
};

export default HomePage;
