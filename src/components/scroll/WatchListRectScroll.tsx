import { Swiper, SwiperSlide } from "swiper/react";
import { WatchListItem } from "@/store/watchListStore";
import { Box, Skeleton } from "@chakra-ui/react";
import WatchListRectCard from "../card/WatchListRectCard";

interface Props {
  watchListItems?: WatchListItem[];
  loading?: boolean;
}

const WatchListRectScroll = ({ watchListItems, loading }: Props) => {
  const watchListItems10: WatchListItem[] = watchListItems?.slice(0, 10) || [];
  const skeletons = Array.from({ length: 10 });

  return (
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
      {loading &&
        skeletons.map((_, index) => (
          <SwiperSlide key={index} style={{ display: loading ? "block" : "none" }}>
            <Skeleton>
              <Box aspectRatio={16 / 9} />
            </Skeleton>
          </SwiperSlide>
        ))}

      {watchListItems10.map((watchListItem) => (
        <SwiperSlide key={watchListItem.id}>
          <WatchListRectCard watchListItem={watchListItem} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default WatchListRectScroll;
