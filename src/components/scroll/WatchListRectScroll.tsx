import { Swiper, SwiperSlide } from "swiper/react";
import { WatchListItem } from "@/store/watchListStore";
import { Box, Skeleton } from "@chakra-ui/react";
import WatchListRectCard from "../card/WatchListRectCard";
import { useInView } from "react-intersection-observer";

interface Props {
  watchListItems?: WatchListItem[];
}

const WatchListRectScroll = ({ watchListItems }: Props) => {
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
          50: { slidesPerView: 2 },
          375: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        loop={false}
        spaceBetween={10}
      >
        {showSkeletons &&
          skeletons.map((_, index) => (
            <SwiperSlide key={index}>
              <Skeleton>
                <Box aspectRatio={16 / 9} />
              </Skeleton>
            </SwiperSlide>
          ))}

        {!showSkeletons &&
          watchListItems10.map((watchListItem) => (
            <SwiperSlide key={`${watchListItem.id}-${watchListItem.mediaType}`}>
              <WatchListRectCard watchListItem={watchListItem} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};
export default WatchListRectScroll;
