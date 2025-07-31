import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import { MediaScroll, MediaScrollHeading } from "@/components/common";
import isMovie from "@/utils/isMovie";
import AiRecommended from "@/components/AiRecommended";
import { Fragment } from "react/jsx-runtime";
import { ReactNode } from "react";
import { useHomeData } from "@/hooks/useHomeData";
import { useInView } from "react-intersection-observer";
import useWatchListStore from "@/store/watchListStore";
import useCustomizationStore from "@/store/customizationStore";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { isLoading, reels } = useHomeData();
  const watchList = useWatchListStore((s) => s.watchList);
  const watchListItems = [...watchList.values()].reverse();
  const disableWatchListHomepage = useCustomizationStore(
    (s) => s.disableWatchListHomepage,
  );

  if (isLoading)
    return (
      <Skeleton w="100%" h="100vh" variant="shine">
        <Text
          visibility="visible"
          fontSize="x-large"
          transform="translate(-50%, -50%)"
          top="50%"
          left="50%"
          color="white"
          textAlign="center"
          position="absolute"
        >
          Loading Your Experience✨
        </Text>
      </Skeleton>
    );

  return (
    <Box>
      <Navbar />
      <Hero />
      {!isLoading && (
        <Box className="w-full md:-mt-32! sm:!px-10 !px-2 z-10 relative">
          {reels.map(
            (reel, index) =>
              reel.media && (
                <Fragment key={reel.heading}>
                  {index == 0 && watchList.size > 0 && !disableWatchListHomepage && (
                    <Wrapper isWatchList>
                      <Flex mb={3} justifyContent="space-between">
                        <MediaScrollHeading highlight={"Watch List"}>
                          Your Watch List
                        </MediaScrollHeading>
                        <Link to="/watchlist">
                          <Text fontSize="md">View all</Text>
                        </Link>
                      </Flex>
                      <MediaScroll loop={false} watchListItems={watchListItems} />
                    </Wrapper>
                  )}
                  {index === 1 && (
                    <Wrapper>
                      <AiRecommended />
                    </Wrapper>
                  )}
                  <Wrapper>
                    <Box mb={3}>
                      <MediaScrollHeading
                        highlight={isMovie(reel.media) ? "Movies" : "TV Shows"}
                      >
                        {reel.heading}
                      </MediaScrollHeading>
                    </Box>
                    <MediaScroll media={reel.media} />
                  </Wrapper>
                </Fragment>
              ),
          )}
        </Box>
      )}
      {!isLoading && <Footer />}
    </Box>
  );
};
interface Props {
  children: ReactNode;
  isWatchList?: boolean;
}

const Wrapper = ({ children, isWatchList }: Props) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const activePalette = useCustomizationStore((s) => s.activePalette);

  return (
    <Skeleton
      ref={ref}
      loading={!inView}
      my={5}
      background="gray.950"
      bgImage={
        isWatchList ? `radial-gradient(circle, #000 45%, ${activePalette} 300%)` : "none"
      }
      borderWidth="1px"
      borderRadius="10px"
      px={{ lg: 10, base: 5 }}
      py={{ lg: 8, base: 5 }}
    >
      {inView ? children : <Box h={"330px"} />}
    </Skeleton>
  );
};

export default HomePage;
