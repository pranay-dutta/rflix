import { MovieDetails } from "@/interfaces/MovieDetails";
import { TvSeriesDetails } from "@/interfaces/TvSeriesDetails";

const isMovieDetails = (media: MovieDetails | TvSeriesDetails): media is MovieDetails  => {
  return (media as MovieDetails).title !== undefined;
}
export default isMovieDetails;