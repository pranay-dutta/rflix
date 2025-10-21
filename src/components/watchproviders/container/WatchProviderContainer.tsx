import useWatchProvider, { WatchProviderType } from "@/hooks/useWatchProvider";
import { Box, Skeleton } from "@chakra-ui/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { Dispatch, SetStateAction, useState } from "react";
import { useInView } from "react-intersection-observer";
import { SiAppletv, SiHbo, SiPrime, SiParamountplus } from "react-icons/si";
import { TbBrandDisney } from "react-icons/tb";
import { RiNetflixFill } from "react-icons/ri";
import { IconType } from "react-icons";
import TvSeries from "@/interfaces/TvSeries";
import WatchProvider from "../presentation/WatchProvider";

interface TabItem {
  value: WatchProviderType;
  label: string;
  icon: IconType;
  color: string;
}

export interface WatchProviderProps {
  setSelectedTab: Dispatch<SetStateAction<WatchProviderType>>;
  selectedTab: WatchProviderType;
  width: number;
  media?: TvSeries[];
  tabItems: TabItem[];
}

const WatchProviderContainer = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [selectedTab, setSelectedTab] = useState<WatchProviderType>("netflix");
  const { data, isLoading, isError } = useWatchProvider(selectedTab);
  const window = useWindowSize();

  if (isError) return null;
  if (!window.width) return null;

  const loading = isLoading || !inView;

  return (
    <Skeleton
      ref={ref}
      my={5}
      loading={loading}
      background="gray.950"
      borderWidth="1px"
      borderRadius="10px"
      px={{ lg: 10, base: 5 }}
      py={{ lg: 8, base: 5 }}
    >
      {loading ? (
        <Box minH={"492px"} />
      ) : (
        <WatchProvider
          media={data?.results}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tabItems={tabItems}
          width={window.width}
        />
      )}
    </Skeleton>
  );
};

const tabItems: TabItem[] = [
  { value: "netflix", label: "Netflix", icon: RiNetflixFill, color: "red.500" },
  { value: "disney+", label: "Disney+", icon: TbBrandDisney, color: "blue.500" },
  { value: "hbo max", label: "HBO", icon: SiHbo, color: "purple.500" },
  { value: "apple tv", label: "Apple TV", icon: SiAppletv, color: "gray.300" },
  { value: "prime", label: "Prime", icon: SiPrime, color: "blue.600" },
  { value: "paramount+", label: "Paramount+", icon: SiParamountplus, color: "blue.400" },
];

export default WatchProviderContainer;
