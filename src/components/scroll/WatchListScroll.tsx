import { Swiper, SwiperSlide } from "swiper/react";
import { WatchListItem } from "@/store/watchListStore";
import { Box, Skeleton } from "@chakra-ui/react";
import WatchListCard from "../card/WatchListCard";

interface Props {
  watchListItems?: WatchListItem[];
  loading?: boolean;
}

const WatchListScroll = ({ watchListItems, loading }: Props) => {
  const watchListItems10: WatchListItem[] = watchListItems?.slice(0, 10) || [];
  const skeletons = Array.from({ length: 10 });

  return (
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
      {loading &&
        skeletons.map((_, index) => (
          <SwiperSlide key={index} style={{ display: loading ? "block" : "none" }}>
            <Skeleton>
              <Box aspectRatio={2 / 3} />
            </Skeleton>
          </SwiperSlide>
        ))}

      {watchListItems10.map((watchListItem) => (
        <SwiperSlide key={watchListItem.id}>
          <WatchListCard watchListItem={watchListItem} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default WatchListScroll;
