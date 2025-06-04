type RandomData = {
  type: "movie" | "tv";
  id: number;
};

const dataLength = 1e4;

const getRandomMedia = async (): Promise<RandomData> => {
  const i = Math.floor(Math.random() * 2);
  const j = Math.floor(Math.random() * dataLength);

  if (i === 0) {
    const { movies_data } = await import("@/data/movies_data");
    return movies_data[j] as RandomData;
  } else {
    const { tv_series_data } = await import("@/data/tv_series_data");
    return tv_series_data[j] as RandomData;
  }
};

export default getRandomMedia;
