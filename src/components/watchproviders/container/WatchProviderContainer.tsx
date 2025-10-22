import useWatchProvider, { WatchProviderType } from "@/hooks/useWatchProvider";
import TvSeries from "@/interfaces/TvSeries";
import { Box, Skeleton } from "@chakra-ui/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useState } from "react";
import { IconType } from "react-icons";
import { RiNetflixFill } from "react-icons/ri";
import { SiAppletv, SiHbo, SiParamountplus, SiPrime } from "react-icons/si";
import { TbBrandDisney } from "react-icons/tb";
import { useInView } from "react-intersection-observer";
import WatchProvider from "../presentation/WatchProvider";

interface TabItem {
  value: WatchProviderType;
  label: string;
  icon: IconType;
  color: string;
}

export interface WatchProviderProps {
  setTab: (value: WatchProviderType) => void;
  loading: boolean;
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

  const setTab = (value: WatchProviderType) => {
    setSelectedTab(value);
  };

  if (isError) return null;
  if (!window.width) return null;

    return (
      <WatchProvider
        media={data?.results}
        selectedTab={selectedTab}
        setTab={setTab}
        loading={isLoading}
        tabItems={tabItems}
        width={window.width}
      />
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
