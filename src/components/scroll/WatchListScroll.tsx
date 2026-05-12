import { Swiper, SwiperSlide } from "swiper/react";
import { WatchListItem } from "@/store/watchListStore";
import { Box } from "@chakra-ui/react";
import WatchListCard from "../card/WatchListCard";
import { useInView } from "react-intersection-observer";
import Skeleton from "../skeleton/Skeleton";
import useCustomizationStore from "@/store/customizationStore";
import Description from "../description/Description";

interface Props {
  watchListItems?: WatchListItem[];
}

const WatchListScroll = ({ watchListItems }: Props) => {
  const watchListItems10: WatchListItem[] = watchListItems?.slice(0, 10) || [];
  const skeletons = Array.from({ length: 10 });
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: "0px 0px -20px 0px",
  });
  const showSkeletons = !inView;
  const cardType = useCustomizationStore((s) => s.cardType);
  const activePalette = useCustomizationStore((s) => s.activePalette);

  return (
    <Box ref={ref}>
      <Swiper
        breakpoints={{
          200: { slidesPerView: 2.1 },
          480: { slidesPerView: 3.1 },
          768: { slidesPerView: 3.1 },
          1024: { slidesPerView: 5.2 },
          1440: { slidesPerView: 6.2 },
        }}
        spaceBetween={10}
        speed={500}
      >
        {showSkeletons &&
          skeletons.map((_, index) => (
            <SwiperSlide key={index}>
              <Skeleton>
                <Box aspectRatio={2 / 3} />
              </Skeleton>
              {cardType === "descriptive" && <Description isLoading={true} />}
            </SwiperSlide>
          ))}

        {!showSkeletons &&
          watchListItems10.map((watchListItem) => (
            <SwiperSlide key={`${watchListItem.id}-${watchListItem.mediaType}`}>
              <Box
                _hover={{ color: `${activePalette}.500` }}
                transition="all 0.3s ease-in-out"
                cursor="pointer"
              >
                <WatchListCard watchListItem={watchListItem} />
                {cardType === "descriptive" && (
                  <Description isLoading={false} watchListItem={watchListItem} />
                )}
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};
export default WatchListScroll;
