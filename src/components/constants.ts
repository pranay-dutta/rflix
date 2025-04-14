import { IconType } from "react-icons";
import { FaDonate, FaHome } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";

export const items: { icon: IconType; label: string; to: string }[] = [
  { icon: FaHome, label: "Home", to: "/home" },
  { icon: MdVideoLibrary, label: "Discover", to: "/discover" },
  { icon: FaDonate, label: "Donate", to: "/donate" },
];
export function getTMDBImage(url: string, quality: "original" | "w500") {
  return `https://image.tmdb.org/t/p/${quality}` + url;
}

export function getPlaceHolder(quality: "w500" | "original") {
  return quality == "original"
    ? "https://fakeimg.pl/1920x1080?text=Movie"
    : "https://fakeimg.pl/500x750?text=Movie";
}
