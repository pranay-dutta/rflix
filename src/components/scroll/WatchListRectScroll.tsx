import { Swiper, SwiperSlide } from "swiper/react";
import { WatchListItem } from "@/store/watchListStore";
import { Box } from "@chakra-ui/react";
import WatchListRectCard from "../card/WatchListRectCard";
import { useInView } from "react-intersection-observer";
import Skeleton from "../skeleton/Skeleton";
import Description from "../description/Description";
import useCustomizationStore from "@/store/customizationStore";

interface Props {
  watchListItems?: WatchListItem[];
}

const WatchListRectScroll = ({ watchListItems }: Props) => {
  const watchListItems10: WatchListItem[] = watchListItems?.slice(0, 10) || [];
  const skeletons = Array.from({ length: 10 });
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: "0px 0px -20px 0px",
  });
  const showSkeletons = !inView;
  const cardType = useCustomizationStore((s) => s.cardType);
  const activePalette = useCustomizationStore((s) => s.activePalette);

  return (
    <Box ref={ref}>
      <Swiper
        breakpoints={{
          50: { slidesPerView: 2 },
          375: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        loop={false}
        spaceBetween={10}
      >
        {showSkeletons &&
          skeletons.map((_, index) => (
            <SwiperSlide key={index}>
              <Skeleton>
                <Box aspectRatio={16 / 9} />
              </Skeleton>
              {cardType === "descriptive" && <Description isLoading={true} />}
            </SwiperSlide>
          ))}

        {!showSkeletons &&
          watchListItems10.map((watchListItem) => (
            <SwiperSlide key={`${watchListItem.id}-${watchListItem.mediaType}`}>
              <Box
                _hover={{ color: `${activePalette}.500` }}
                transition="all 0.3s ease-in-out"
                cursor="pointer"
              >
                <WatchListRectCard watchListItem={watchListItem} />
                {cardType === "descriptive" && (
                  <Description isLoading={false} watchListItem={watchListItem} />
                )}
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};
export default WatchListRectScroll;
