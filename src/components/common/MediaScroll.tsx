import { Movie } from "@/interfaces/Movie";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Card";
import TvSeries from "@/interfaces/TvSeries";

const MovieScroll = ({ media }: { media: Movie[] | TvSeries[] }) => {
  if (!media.length) return null;

  return (
    <Swiper
      breakpoints={{
        200: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        768: { slidesPerView: 5 },
        1024: { slidesPerView: 6 },
        1080: { slidesPerView: 7 },
      }}
      loop
      spaceBetween={15}
    >
      {media.map((media) => (
        <SwiperSlide className="py-3!">
          <Card key={media.id} media={media} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default MovieScroll;
