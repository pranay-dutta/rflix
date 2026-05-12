import useTrending from "@/hooks/useTrending";
import ms from "ms";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AspectRatioContainer from "../AspectRatioContainer";
import HeroImageOverlay from "./HeroImageOverlay";
import { filterLowVotes } from "./hero_utils";
import Skeleton from "../skeleton/Skeleton";

const Hero = () => {
  const { data, isLoading } = useTrending("all", "day", true);
  const filteredData = filterLowVotes(data);

  if (isLoading) {
    return (
      <AspectRatioContainer>
        <>
          <Skeleton height="100%" width="100%" borderRadius="md" />
          {/* Bottom overlay that blends with the hero */}
          <div className="absolute bottom-0 z-[1] w-full h-72 bg-gradient-to-t from-[var(--background)] to-transparent" />
        </>
      </AspectRatioContainer>
    );
  }

  return (
    <>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: ms("12s"), pauseOnMouseEnter: true }}
        grabCursor
        watchSlidesProgress
      >
        {filteredData.map((media) => (
          <SwiperSlide key={media.id}>
            {({ isActive }) => <HeroImageOverlay isActive={isActive} media={media} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Hero;
