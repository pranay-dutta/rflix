import { Movie } from "@/interfaces/Movie";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../card/Card";
import TvSeries from "@/interfaces/TvSeries";
import { Box, Button, Skeleton } from "@chakra-ui/react";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Navigation } from "swiper/modules";
import { useInView } from "react-intersection-observer";
interface Props {
  media?: Movie[] | TvSeries[];
  loading?: boolean;
}
const MediaScroll = ({ media, loading }: Props) => {
  const skeletons = Array.from({ length: 20 });
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: "0px 0px -20px 0px",
  });
  const showSkeletons = loading || !inView;

  return (
    <Box ref={ref}>
      <div className="group relative overflow-hidden">
        {/* LEFT ARROW */}
        <Button
          ref={prevRef}
          position="absolute"
          variant="ghost"
          left="0"
          top="50%"
          zIndex="10"
          transform="translateY(-50%)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          opacity="0"
          _groupHover={{ opacity: 1 }}
          w="6"
          h="full"
          px="4"
          transition="all 0.3s"
          color="white"
          fontSize="3xl"
          willChange="transform"
          _hover={{ transform: "translateY(-50%) scale(1.25)", bg: "blackAlpha.700" }}
        >
          <FaChevronLeft size={20} />
        </Button>

        {/* RIGHT ARROW */}
        <Button
          ref={nextRef}
          position="absolute"
          variant="ghost"
          right="0"
          top="50%"
          zIndex="10"
          transform="translateY(-50%)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          opacity="0"
          _groupHover={{ opacity: 1 }}
          w="6"
          h="full"
          px="4"
          transition="all 0.3s"
          fontSize="3xl"
          willChange="transform"
          _hover={{ transform: "translateY(-50%) scale(1.25)", bg: "blackAlpha.700" }}
        >
          <FaChevronRight size={20} />
        </Button>
        <Swiper
          breakpoints={{
            200: { slidesPerView: 2.1 },
            480: { slidesPerView: 3.1 },
            768: { slidesPerView: 3.1 },
            1024: { slidesPerView: 5.2 },
            1440: { slidesPerView: 6.2 },
          }}
          spaceBetween={10}
          modules={[Navigation]}
          slidesPerGroup={2}
          speed={300}
          onBeforeInit={(swiper) => {
            if (!swiper.params.navigation) return;

            if (typeof swiper.params.navigation !== "boolean") {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
        >
          {showSkeletons &&
            skeletons.map((_, index) => (
              <SwiperSlide key={index}>
                <Skeleton>
                  <Box aspectRatio={2 / 3} />
                </Skeleton>
              </SwiperSlide>
            ))}

          {!showSkeletons &&
            media &&
            media.map((media) => (
              <SwiperSlide key={media.id}>
                <Card media={media} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </Box>
  );
};
export default MediaScroll;
