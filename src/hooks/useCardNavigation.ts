import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import { useNavigate } from "react-router-dom";
import isMovie from "../utils/isMovie";

const useCardNavigation = () => {
  const navigate = useNavigate();
  const handleCardClick = (media?: Movie | TvSeries) => {
    if (!media) return;

    const path = isMovie(media) ? "movie" : "tv";
    const id = media.id;
    console.log(media.media_type)
    navigate(`/info/${path}/${id}`);
  };
  return { handleCardClick };
};
export default useCardNavigation;
