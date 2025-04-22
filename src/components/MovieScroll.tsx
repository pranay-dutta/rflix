import { Movie } from "@/interfaces/Movie";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
import TvSeries from "@/interfaces/TvSeries";

const MovieScroll = ({ media }: { media: Movie[] | TvSeries[] }) => {
  return (
    <Swiper
      breakpoints={{
        200: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 15,
        },
        1080: {
          slidesPerView: 7,
          spaceBetween: 15,
        },
        1536: {
          slidesPerView: 8,
          spaceBetween: 15,
        },
      }}
      loop
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
