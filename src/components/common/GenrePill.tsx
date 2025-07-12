import useCustomizationStore from "@/store/customizationStore";
import {
  GenreState,
  useMovieGenresStore,
  useTvGenresStore,
} from "@/store/genreListStore";
import {
  useSelectedMovieGenreStore,
  useSelectedTvGenreStore,
} from "@/store/selectedGenresStore";
import { Box } from "@chakra-ui/react";

interface Props {
  genre: GenreState;
  type: "movie" | "tv";
}

const GenrePill = ({ genre, type }: Props) => {
  //Active color palette
  const activePalette = useCustomizationStore((s) => s.activePalette);

  //Zustand store to get genres and set selected property
  const toggleMovieGenreSelected = useMovieGenresStore((s) => s.toggleSelected);
  const toggleTvGenreSelected = useTvGenresStore((s) => s.toggleSelected);

  //Zustand store to keep a Set<number> of selected genres
  const hasMovieGenreId = useSelectedMovieGenreStore((s) => s.hasMovieGenreId);
  const removeMovieGenreId = useSelectedMovieGenreStore((s) => s.removeMovieGenreId);
  const insertMovieGenreId = useSelectedMovieGenreStore((s) => s.insertMovieGenreId);

  const hasTvGenreId = useSelectedTvGenreStore((s) => s.hasTvGenreId);
  const removeTvGenreId = useSelectedTvGenreStore((s) => s.removeTvGenreId);
  const insertTvGenreId = useSelectedTvGenreStore((s) => s.insertTvGenreId);

  const handleClick = () => {
    if (type === "movie") {
      toggleMovieGenreSelected(genre.id);

      if (hasMovieGenreId(genre.id)) removeMovieGenreId(genre.id);
      else insertMovieGenreId(genre.id);
    } else {
      toggleTvGenreSelected(genre.id);

      if (hasTvGenreId(genre.id)) removeTvGenreId(genre.id);
      else insertTvGenreId(genre.id);
    }
  };

  return (
    <Box
      px={{ base: 2, md: 4 }}
      py={{ base: 0.5, md: 1 }}
      cursor="pointer"
      userSelect="none"
      display="inline-block"
      backgroundColor={genre.selected ? `${activePalette}.700` : "gray.900"}
      onClick={handleClick}
      fontSize={{ base: "smaller", md: "sm" }}
      borderRadius="20px"
    >
      {genre.name}
    </Box>
  );
};

export default GenrePill;
