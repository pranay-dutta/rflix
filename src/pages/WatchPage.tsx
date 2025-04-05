import { useParams } from "react-router-dom";
import { AspectRatio, SimpleGrid } from "@chakra-ui/react";
import useMovie from "@/hooks/useMovie";

const WatchPage = () => {
  const { id } = useParams();
  if (!id) throw new Error();

  const { data } = useMovie(parseInt(id));

  return (
    <SimpleGrid
      p={10}
      columns={{
        base: 1,
        md: 2,
      }}
    >
      <div id="info">
        <h1>{data?.title}</h1>
        <h2>{data?.popularity}</h2>
        <h2>{data?.release_date}</h2>
      </div>
      <AspectRatio bg="bg.muted" ratio={2 / 1}>
        <iframe
          src={`https://player.videasy.net/movie/${id}`}
          allowFullScreen
        />
      </AspectRatio>
    </SimpleGrid>
  );
};

export default WatchPage;
