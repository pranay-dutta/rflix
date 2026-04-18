import { Swiper, SwiperSlide } from "swiper/react";
import { WatchListItem } from "@/store/watchListStore";
import { Box, Skeleton } from "@chakra-ui/react";
import WatchListCard from "../card/WatchListCard";
import { useInView } from "react-intersection-observer";

interface Props {
  watchListItems?: WatchListItem[];
}

const WatchListScroll = ({ watchListItems }: Props) => {
  const watchListItems10: WatchListItem[] = watchListItems?.slice(0, 10) || [];
  const skeletons = Array.from({ length: 10 });
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: "0px 0px -100px 0px",
  });
  const showSkeletons = !inView;

  return (
    <Box ref={ref} mb={20}>
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
            </SwiperSlide>
          ))}

        {!showSkeletons &&
          watchListItems10.map((watchListItem) => (
            <SwiperSlide key={`${watchListItem.id}-${watchListItem.mediaType}`}>
              <WatchListCard watchListItem={watchListItem} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};
export default WatchListScroll;
