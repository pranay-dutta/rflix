import { IconType } from "react-icons";
import { RiHome2Line, RiInformationLine, RiMovieLine, RiTvLine } from "react-icons/ri";
import { GrSearchAdvanced } from "react-icons/gr";

export interface NavItemChild {
  icon?: IconType;
  label: string;
  to: string;
}
export interface NavItem {
  icon: IconType;
  label: string;
  to: string;
  hasDropdown: boolean;
  children: NavItemChild[];
}

export const navItems: NavItem[] = [
  { icon: RiHome2Line, label: "Home", to: "/", hasDropdown: false, children: [] },
  {
    icon: RiMovieLine,
    label: "Movies",
    to: "/movies",
    hasDropdown: true,
    children: [
      { label: "Popular", to: "/movies/popular" },
      { label: "Top Rated", to: "/movies/top_rated" },
      { label: "Now Playing", to: "/movies/now_playing" },
      { label: "Upcoming", to: "/movies/upcoming" },
    ],
  },
  {
    icon: RiTvLine,
    label: "Tv Shows",
    to: "/tvshows",
    hasDropdown: true,
    children: [
      { label: "Popular", to: "/tvshows/popular" },
      { label: "Top Rated", to: "/tvshows/top_rated" },
      { label: "Airing Today", to: "/tvshows/airing_today" },
      { label: "On The Air", to: "/tvshows/on_the_air" },
    ],
  },
  {
    icon: GrSearchAdvanced,
    label: "Discover",
    to: "/discover",
    hasDropdown: true,
    children: [
      { label: "Discover Movies", to: "/discover/movie" },
      { label: "Discover TV Shows", to: "/discover/tv" },
    ],
  },
  {
    icon: RiInformationLine,
    label: "About",
    to: "/about",
    hasDropdown: false,
    children: [],
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
