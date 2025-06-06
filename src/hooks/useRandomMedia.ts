import { movies_data } from "@/data/movies_data";
import { tv_series_data } from "@/data/tv_series_data";

type RandomData = {
  type: "movie" | "tv";
  id: number;
};
const useRandomMedia = (): RandomData | null => {
  const dataLength = 1e4;
  const data = [movies_data, tv_series_data];
  const i = Math.floor(Math.random() * 2);
  const j = Math.floor(Math.random() * dataLength);

  return data[i][j] as RandomData;
};
export default useRandomMedia;
