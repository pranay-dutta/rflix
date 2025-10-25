import { Movie } from "@/interfaces/Movie";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Card";
import TvSeries from "@/interfaces/TvSeries";
import { WatchListItem } from "@/store/watchListStore";
import WatchListCard from "./WatchListCard";
import { Box, Skeleton } from "@chakra-ui/react";

interface Props {
  media?: Movie[] | TvSeries[];
  watchListItems?: WatchListItem[];
  similarMedia?: boolean;
  loop?: boolean;
  loading?: boolean;
}

const minHeight = {
  base: "255px",
  sm: "192px",
  md: "255px",
  lg: "225px",
  xl: "286px",
  "2xl": "286px",
};

const MediaScroll = ({ media, watchListItems, loop = true, loading }: Props) => {
  const watchListItems10: WatchListItem[] = watchListItems?.slice(0, 10) || [];
  const skeletons = Array.from({ length: 20 });

  return (
    <Box minHeight={minHeight}>
      <Swiper
        breakpoints={{
          200: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
          1440: { slidesPerView: 6 },
        }}
        loop={loop}
        spaceBetween={15}
      >
        {loading &&
          skeletons.map((_, index) => (
            <SwiperSlide key={index} style={{ opacity: loading ? 1 : 0 }}>
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
    </Box>
  );
};
export default MediaScroll;
