import { Movie } from "@/interfaces/Movie";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Card";
import TvSeries from "@/interfaces/TvSeries";
import { WatchListItem } from "@/store/watchListStore";
import WatchListCard from "./WatchListCard";
import { Skeleton } from "@chakra-ui/react";

interface Props {
  media?: Movie[] | TvSeries[];
  watchListItems?: WatchListItem[];
  similarMedia?: boolean;
  loop?: boolean;
  loading?: boolean;
}

const MediaScroll = ({ media, watchListItems, loop = true, loading }: Props) => {
  if (media && !media.length) return null;

  //Show only top 10 watch list items
  const watchListItems10: WatchListItem[] = watchListItems?.slice(0, 10) || [];

  // Use same dimensions as actual cards
  const cardWidth = {
    base: "190px",
    sm: "160px",
    md: "170px",
    lg: "150px",
    xl: "240px",
    "2xl": "240px",
  };
  const cardHeight = {
    base: "285px",
    sm: "240px",
    md: "255px",
    lg: "225px",
    xl: "270px",
    "2xl": "270px",
  };

  const skeletons = Array.from({ length: 20 });

  return (
    <Swiper
      breakpoints={{
        200: { slidesPerView: 2 },
        428: { slidesPerView: 3 },
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
        1440: { slidesPerView: 7 },
      }}
      loop={loop}
      spaceBetween={15}
    >
      {loading &&
        skeletons.map((_, index) => (
          <SwiperSlide key={index} className="py-3!" style={{ overflow: "hidden" }}>
            <Skeleton w={cardHeight} h={cardHeight} maxW={cardWidth} maxH={cardHeight} />
          </SwiperSlide>
        ))}
      {watchListItems10.map((watchListItem) => (
        <SwiperSlide className="py-3!" key={watchListItem.id}>
          <WatchListCard watchListItem={watchListItem} />
        </SwiperSlide>
      ))}

      {media?.map((media) => (
        <SwiperSlide className="py-3!" key={media.id}>
          <Card width={cardWidth} height={cardHeight} media={media} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default MediaScroll;
