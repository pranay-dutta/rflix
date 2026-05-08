import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";
import { FetchResponse } from "@/interfaces/FetchResponse";

const filterLowVotes = (data: FetchResponse<Movie | TvSeries> | undefined) => {
  if (!data || !data.results) return [];

  // filter out media with low vote count to ensure quality
  const filterHelper = (item: Movie | TvSeries) => {
    if (item.vote_count < 100) return false;
    return item.media_type === "movie" || item.media_type === "tv";
  };

  return data.results.filter(filterHelper);
};
export { filterLowVotes };
