import { IconType } from "react-icons";
import { RiHome2Line, RiMoneyDollarBoxLine, RiMovieLine, RiTvLine } from "react-icons/ri";

export interface NavItem {
  icon: IconType;
  label: string;
  to: string;
  showDropdown: boolean;
}

export const navItems: NavItem[] = [
  { icon: RiHome2Line, label: "Home", to: "/", showDropdown: false },
  { icon: RiMovieLine, label: "Movies", to: "/movies", showDropdown: true },
  { icon: RiTvLine, label: "Tv Series", to: "/tvseries", showDropdown: true },
  {
    icon: RiMoneyDollarBoxLine,
    label: "Donate",
    to: "/donate",
    showDropdown: false,
  },
];
export function getTMDBImage(
  url: string,
  quality: "original" | "w500",
  placeholderDimension?: "vertical" | "horizontal",
) {
  const dimension = placeholderDimension === "horizontal" ? "1920x1080" : "500x750";
  if (!url) return `https://fakeimg.ryd.tools/${dimension}/111?text=Media`;
  return `https://image.tmdb.org/t/p/${quality}` + url;
}
