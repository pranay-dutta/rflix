import { Movie } from "@/hooks/useMovies";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";

const MovieScroll = ({ movies }: { movies: Movie[] }) => {
  return (
    <Swiper
      slidesPerView={8}
      spaceBetween={10}
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
