// import useImages from "@/hooks/useImages";
import useMovies from "@/hooks/useMovies";
import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperSlideChild from "./SwiperSlideChild";
import MovieVideo from "./MovieVideo";
import { useState } from "react";

const Hero2 = () => {
  const { data: movies } = useMovies(1);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!movies) return null;

  return (
    <Swiper
      className="bg-blue-700 text-white"
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
    >
      {movies.results.map((movie, index) => {
        return (
          <SwiperSlide key={movie.id} className="transition-all ">
            {<MovieVideo movieId={movie.id} isActive={activeIndex === index} />}
            {/* <SwiperSlideChild movieId={movie.id} /> */}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Hero2;
