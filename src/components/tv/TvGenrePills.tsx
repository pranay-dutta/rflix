import { useTvGenresStore } from "@/store/genreListStore";
import { Box } from "@chakra-ui/react";
import GenrePill from "../common/GenrePill";

const TvGenrePills = () => {
  const tvGenreMap = useTvGenresStore(s => s.tvGenreMap);
  return (
    <Box className="flex gap-2 flex-wrap" my={3}>
      {[...tvGenreMap.values()].map((genre) => <GenrePill key={genre.id} genre={genre} type="tv" />)}
    </Box>
  )
}
export default TvGenrePills