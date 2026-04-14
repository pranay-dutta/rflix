import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import { Box, Skeleton } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import RectCard from "../card/RectCard";

interface Props {
  media?: Movie[] | TvSeries[];
  loading?: boolean;
}

const RectMediaScroll = ({ media, loading }: Props) => {
  const skeletons = Array.from({ length: 20 });

  return (
    <>
      <Swiper
        breakpoints={{
          50: { slidesPerView: 2 },
          375: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        loop={true}
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
        {!loading && media && media.map((m) => (
            <SwiperSlide key={m.id}>
              <RectCard media={m} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default RectMediaScroll;
