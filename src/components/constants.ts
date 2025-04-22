import { IconType } from "react-icons";
import { RiHome2Line, RiMoneyDollarBoxLine, RiMovieLine, RiTvLine } from "react-icons/ri";

export const items: { icon: IconType; label: string; to: string }[] = [
  { icon: RiHome2Line, label: "Home", to: "/" },
  { icon: RiMovieLine, label: "Movies", to: "/movies" },
  { icon: RiTvLine, label: "Tv Shows", to: "/tvshows" },
  { icon: RiMoneyDollarBoxLine, label: "Donate", to: "/donate" },
];
export function getTMDBImage(url: string, quality: "original" | "w500") {
  return `https://image.tmdb.org/t/p/${quality}` + url;
}

export function getPlaceHolder(quality: "w500" | "original") {
  return quality == "original"
    ? "https://fakeimg.pl/1920x1080?text=Media"
    : "https://fakeimg.pl/500x750?text=Media";
}
