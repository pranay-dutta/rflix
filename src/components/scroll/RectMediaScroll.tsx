import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import { Box, Skeleton } from "@chakra-ui/react";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import RectCard from "../card/RectCard";

interface Props {
  media?: Movie[] | TvSeries[];
  loading?: boolean;
}

const RectMediaScroll = ({ media, loading }: Props) => {
  const skeletons = Array.from({ length: 20 });

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    //TODO: extract arrows and don't use tailwind classes here
    <div className="group relative overflow-hidden">
      {/* LEFT ARROW */}
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
          50: { slidesPerView: 2.1 },
          768: { slidesPerView: 3.1 },
          1024: { slidesPerView: 4.1 },
        }}
        spaceBetween={10}
        slidesPerGroup={2}
        modules={[Navigation]}
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
            <SwiperSlide key={index}>
              <Skeleton>
                <Box aspectRatio={16 / 9} />
              </Skeleton>
            </SwiperSlide>
          ))}

        {!loading &&
          media &&
          media.map((m) => (
            <SwiperSlide key={m.id}>
              <RectCard media={m} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default RectMediaScroll;
