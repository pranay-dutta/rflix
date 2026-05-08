import { FaRegHeart } from "react-icons/fa6";
import { FiTv, FiInfo } from "react-icons/fi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiMovieLine, RiCompassDiscoverLine } from "react-icons/ri";

const contentBrowseItems = [
  { label: "Movies", Icon: RiMovieLine, link: "/movies" },
  { label: "TV Shows", Icon: FiTv, link: "/tv" },
  { label: "Discover", Icon: RiCompassDiscoverLine, link: "/discover" },
];
const featureBrowseItems = [
  { label: "Watch List", Icon: FaRegHeart, color: "cyan", link: "/watchlist" },
  { label: "About", Icon: FiInfo, color: "salmon", link: "/about" },
  {
    label: "Customize",
    Icon: MdOutlineDashboardCustomize,
    color: "lightgreen",
    link: "/customize",
  },
];
export { contentBrowseItems, featureBrowseItems };
