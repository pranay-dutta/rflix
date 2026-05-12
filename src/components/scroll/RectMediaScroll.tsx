import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import useCustomizationStore from "@/store/customizationStore";
import { Box, Button } from "@chakra-ui/react";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useInView } from "react-intersection-observer";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import RectCard from "../card/RectCard";
import Description from "../description/Description";
import Skeleton from "../skeleton/Skeleton";

interface Props {
  media?: Movie[] | TvSeries[];
  loading?: boolean;
}

const RectMediaScroll = ({ media, loading = true }: Props) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const skeletons = Array.from({ length: 5 });

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: "0px 0px -20px 0px",
  });
  const cardType = useCustomizationStore((s) => s.cardType);
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
            50: { slidesPerView: 2.1 },
            768: { slidesPerView: 3.1 },
            1024: { slidesPerView: 4.1 },
          }}
          spaceBetween={10}
          slidesPerGroup={2}
          modules={[Navigation]}
          effect="fade"
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
                <Box>
                  <Skeleton>
                    <Box aspectRatio={16 / 9} />
                  </Skeleton>
                  {cardType === "descriptive" && <Description isLoading={true} />}
                </Box>
              </SwiperSlide>
            ))}

          {media &&
            media.map((m) => (
              <SwiperSlide key={m.id}>
                <RectCard media={m} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </Box>
  );
};

export default RectMediaScroll;
