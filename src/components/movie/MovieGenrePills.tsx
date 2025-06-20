import { useMovieGenresStore } from "@/store/genreListStore";
import { Box } from "@chakra-ui/react";
import GenrePill from "../common/GenrePill";

const MovieGenrePills = () => {
  const movieGenreMap = useMovieGenresStore(s => s.movieGenreMap);
  return (
    <Box className="flex gap-2 flex-wrap" my={2}>
      {[...movieGenreMap.values()].map((genre) => <GenrePill key={genre.id} genre={genre} type="movie" />)}
    </Box>
  )
}
export default MovieGenrePills