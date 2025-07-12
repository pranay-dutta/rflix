import { Movie } from "@/interfaces/Movie";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Card";
import TvSeries from "@/interfaces/TvSeries";
import { WatchListItem } from "@/store/watchListStore";
import WatchListCard from "./WatchListCard";

interface Props {
  media?: Movie[] | TvSeries[];
  watchListItems?: WatchListItem[];
  loop?: boolean;
}

const MediaScroll = ({ media, watchListItems, loop = true }: Props) => {
  if (media && !media.length) return null;

  //Show only top 10 watchlist items
  const watchListItems10: WatchListItem[] = watchListItems?.slice(0, 10) || [];

  return (
    <Swiper
      breakpoints={{
        200: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        768: { slidesPerView: 5 },
        1024: { slidesPerView: 6 },
        1080: { slidesPerView: 7 },
      }}
      loop={loop}
      spaceBetween={15}
    >
      {watchListItems10.map((watchListItem) => (
        <SwiperSlide className="py-3!">
          <WatchListCard watchListItem={watchListItem} />
        </SwiperSlide>
      ))}

      {media?.map((media) => (
        <SwiperSlide className="py-3!">
          <Card key={media.id} media={media} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default MediaScroll;
