import { IconType } from "react-icons";
import { RiHome2Line, RiMoneyDollarBoxLine, RiMovieLine, RiTvLine } from "react-icons/ri";

export const items: { icon: IconType; label: string; to: string }[] = [
  { icon: RiHome2Line, label: "Home", to: "/" },
  { icon: RiMovieLine, label: "Movies", to: "/movies" },
  { icon: RiTvLine, label: "Tv Shows", to: "/tvshows" },
  { icon: RiMoneyDollarBoxLine, label: "Donate", to: "/donate" },
];
export function getTMDBImage(
  url: string,
  quality: "original" | "w500",
  placeholderDimension: "vertical" | "horizontal",
) {
  const dimension = placeholderDimension === "horizontal" ? "1920x1080" : "500x750";
  if (!url) return `https://fakeimg.ryd.tools/${dimension}/111?text=Media`;
  return `https://image.tmdb.org/t/p/${quality}` + url;
}
