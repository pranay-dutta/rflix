import { Movie } from "@/interfaces/Movie";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../card/Card";
import TvSeries from "@/interfaces/TvSeries";
import { WatchListItem } from "@/store/watchListStore";
import { Box, Skeleton } from "@chakra-ui/react";
import WatchListCard from "../card/WatchListCard";

interface Props {
  media?: Movie[] | TvSeries[];
  watchListItems?: WatchListItem[];
  similarMedia?: boolean;
  loop?: boolean;
  loading?: boolean;
}

const MediaScroll = ({ media, watchListItems, loop = true, loading }: Props) => {
  const watchListItems10: WatchListItem[] = watchListItems?.slice(0, 10) || [];
  const skeletons = Array.from({ length: 20 });

  return (
    <Swiper
      breakpoints={{
        200: { slidesPerView: 2 },
        480: { slidesPerView: 3 },
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
        1440: { slidesPerView: 6 },
      }}
      loop={loop}
      spaceBetween={15}
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

      {media &&
        media.map((media) => (
          <SwiperSlide key={media.id}>
            <Card media={media} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
export default MediaScroll;
