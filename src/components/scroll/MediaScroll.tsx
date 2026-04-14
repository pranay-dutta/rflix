import { Movie } from "@/interfaces/Movie";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../card/Card";
import TvSeries from "@/interfaces/TvSeries";
import { Box, Skeleton } from "@chakra-ui/react";

interface Props {
  media?: Movie[] | TvSeries[];
  loop?: boolean;
  loading?: boolean;
}

const MediaScroll = ({ media, loop = true, loading }: Props) => {
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
