import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";

const isMovie = (media: Movie | TvSeries | Movie[] | TvSeries[]): media is Movie => {
  if (Array.isArray(media)) return (media[0] as Movie).title !== undefined;
  return (media as Movie).title !== undefined;
};
export default isMovie;
