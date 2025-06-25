import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Box } from "@chakra-ui/react";
import { MediaScroll, MediaScrollHeading } from "@/components/common";
import isMovie from "@/utils/isMovie";
import AiRecommended from "@/components/AiRecommended";
import { Fragment } from "react/jsx-runtime";
import { PropsWithChildren } from "react";
import { useHomeData } from "@/hooks/useHomeData";

const HomePage = () => {
  const { isLoading, reels } = useHomeData();
  return (
    <Box>
      <Navbar />
      <Hero />
      {!isLoading && (
        <Box className="w-full md:-mt-32! sm:!px-10 !px-2 z-10 relative">
          {reels.map(
            ({ media, heading }, index) =>
              media && (
                <Fragment key={heading}>
                  {index === 1 && (
                    <Wrapper>
                      <AiRecommended />
                    </Wrapper>
                  )}
                  <Wrapper>
                    <Box mb={3}>
                      <MediaScrollHeading
                        highlight={isMovie(media) ? "Movies" : "TV Shows"}
                      >
                        {heading}
                      </MediaScrollHeading>
                    </Box>
                    <MediaScroll media={media} />
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

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <Box
      my={5}
      bg="gray.950"
      borderWidth="1px"
      borderRadius="10px"
      px={{ lg: 10, base: 5 }}
      py={{ lg: 8, base: 5 }}
    >
      {children}
    </Box>
  );
};

export default HomePage;
