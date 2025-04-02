import { IconType } from "react-icons";
import { FaDonate, FaHome } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";

export const items: { icon: IconType; label: string }[] = [
  { icon: FaHome, label: "Home" },
  { icon: MdVideoLibrary, label: "Discover" },
  { icon: FaDonate, label: "Donate" },
];
