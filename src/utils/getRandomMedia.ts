const media = ["movie", "tv"];

type Data = {
  id: number;
  type: "movie" | "tv";
};

const getRandomMedia = () => {
  const id = Math.floor(Math.random() * 1.3e4);
  const j = Math.floor(Math.random() * 2);

  const type = media[j];

  return { type, id } as Data;
};

export default getRandomMedia;
