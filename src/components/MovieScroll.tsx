import { Movie } from "@/hooks/useMovies";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";

const MovieScroll = ({ movies }: { movies: Movie[] }) => {
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
      {movies.map((movie) => (
        <SwiperSlide>
          <MovieCard key={movie.id} movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MovieScroll;
