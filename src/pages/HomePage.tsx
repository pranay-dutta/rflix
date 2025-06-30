import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Box, Skeleton } from "@chakra-ui/react";
import { MediaScroll, MediaScrollHeading } from "@/components/common";
import isMovie from "@/utils/isMovie";
import AiRecommended from "@/components/AiRecommended";
import { Fragment } from "react/jsx-runtime";
import { ReactNode } from "react";
import { useHomeData } from "@/hooks/useHomeData";
import { useInView } from "react-intersection-observer";

const HomePage = () => {
  const { isLoading, reels } = useHomeData();
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
                  {index === 1 && (
                    <Wrapper isAi={true}>
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
  isAi?: boolean;
}

const Wrapper = ({ children }: Props) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  return (
    <Skeleton
      ref={ref}
      loading={!inView}
      my={5}
      bg="gray.950"
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
