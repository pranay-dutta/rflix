import { Movie } from "@/interfaces/Movie";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../card/Card";
import TvSeries from "@/interfaces/TvSeries";
import { Box, Skeleton } from "@chakra-ui/react";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Navigation } from "swiper/modules";
interface Props {
  media?: Movie[] | TvSeries[];
  loading?: boolean;
}
const MediaScroll = ({ media, loading }: Props) => {
  const skeletons = Array.from({ length: 20 });
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="group relative overflow-hidden">
      <button
        ref={prevRef}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center
                   opacity-0 group-hover:opacity-100 w-8
                   transition-all duration-300
                   h-full px-4
                   bg-gradient-to-r from-black/70 to-transparent
                   text-white text-3xl hover:scale-125 hover:bg-black/70! will-change-transform"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* RIGHT ARROW */}
      <button
        ref={nextRef}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center
                   opacity-0 group-hover:opacity-100 w-8
                   transition-all duration-300
                   h-full px-4 
                   bg-gradient-to-l from-black/70 to-transparent
                   text-white text-3xl hover:scale-125 hover:bg-black/70! will-change-transform"
      >
        <FaChevronRight size={20} />
      </button>
      <Swiper
        breakpoints={{
          200: { slidesPerView: 2.1 },
          480: { slidesPerView: 3.1 },
          768: { slidesPerView: 3.1 },
          1024: { slidesPerView: 5.2 },
          1440: { slidesPerView: 6.2 },
        }}
        spaceBetween={10}
        modules={[Navigation]}
        slidesPerGroup={2}
        speed={300}
        onBeforeInit={(swiper) => {
          if (!swiper.params.navigation) return;

          if (typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
      >
        {loading &&
          skeletons.map((_, index) => (
            <SwiperSlide key={index} style={{ display: loading ? "block" : "none" }}>
              <Skeleton>
                <Box aspectRatio={2 / 3} />
              </Skeleton>
            </SwiperSlide>
          ))}

        {!loading &&
          media &&
          media.map((media) => (
            <SwiperSlide key={media.id}>
              <Card media={media} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
export default MediaScroll;
