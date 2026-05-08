import { TbChartBarPopular } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { LuMonitorPlay } from "react-icons/lu";
import { MdLiveTv, MdOutlineCalendarToday } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";

const movieRadioItems = [
  { value: "popular", title: "Popular", Icon: TbChartBarPopular },
  { value: "now_playing", title: "Now Playing", Icon: LuMonitorPlay },
  { value: "top_rated", title: "Top Rated", Icon: FaRegStar },
  { value: "upcoming", title: "Upcoming", Icon: IoIosTimer },
];

const tvRadioItems = [
  { value: "popular", title: "Popular", Icon: TbChartBarPopular },
  { value: "top_rated", title: "Top Rated", Icon: FaRegStar },
  {
    value: "airing_today",
    title: "Airing Today",
    Icon: MdOutlineCalendarToday,
  },
  { value: "on_the_air", title: "Live on TV", Icon: MdLiveTv },
];

export { movieRadioItems, tvRadioItems };
