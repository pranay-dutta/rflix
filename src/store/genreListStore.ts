import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

export type GenreState = {
  id: number;
  name: string;
  selected: boolean;
};

type MovieGenreStore = {
  movieGenreMap: Map<number, GenreState>;
  toggleSelected: (id: number) => void;
};

type TvGenreStore = {
  tvGenreMap: Map<number, GenreState>;
  toggleSelected: (id: number) => void;
};

const initialMovieGenres: GenreState[] = [
  { id: 28, name: "Action", selected: false },
  { id: 12, name: "Adventure", selected: false },
  { id: 16, name: "Animation", selected: false },
  { id: 35, name: "Comedy", selected: false },
  { id: 80, name: "Crime", selected: false },
  { id: 99, name: "Documentary", selected: false },
  { id: 18, name: "Drama", selected: false },
  { id: 10751, name: "Family", selected: false },
  { id: 14, name: "Fantasy", selected: false },
  { id: 36, name: "History", selected: false },
  { id: 27, name: "Horror", selected: false },
  { id: 10402, name: "Music", selected: false },
  { id: 9648, name: "Mystery", selected: false },
  { id: 10749, name: "Romance", selected: false },
  { id: 878, name: "Science Fiction", selected: false },
  { id: 10770, name: "TV Movie", selected: false },
  { id: 53, name: "Thriller", selected: false },
  { id: 10752, name: "War", selected: false },
  { id: 37, name: "Western", selected: false },
];
const initialTvGenres: GenreState[] = [
  { id: 10759, name: "Action & Adventure", selected: false },
  { id: 16, name: "Animation", selected: false },
  { id: 35, name: "Comedy", selected: false },
  { id: 80, name: "Crime", selected: false },
  { id: 99, name: "Documentary", selected: false },
  { id: 18, name: "Drama", selected: false },
  { id: 10751, name: "Family", selected: false },
  { id: 10762, name: "Kids", selected: false },
  { id: 9648, name: "Mystery", selected: false },
  { id: 10763, name: "News", selected: false },
  { id: 10764, name: "Reality", selected: false },
  { id: 10765, name: "Sci-Fi & Fantasy", selected: false },
  { id: 10766, name: "Soap", selected: false },
  { id: 10767, name: "Talk", selected: false },
  { id: 10768, name: "War & Politics", selected: false },
  { id: 37, name: "Western", selected: false },
];

export const useMovieGenresStore = create<MovieGenreStore>()((set) => ({
  movieGenreMap: new Map(initialMovieGenres.map((genre) => [genre.id, genre])),

  toggleSelected: (id: number) =>
    set((state) => {
      const updated = new Map(state.movieGenreMap); //clone
      const genre = updated.get(id);

      if (genre) {
        updated.set(id, { ...genre, selected: !genre.selected });
      }
      return { movieGenreMap: updated }; //update
    }),
}));

export const useTvGenresStore = create<TvGenreStore>()((set) => ({
  tvGenreMap: new Map(initialTvGenres.map((genre) => [genre.id, genre])),

  toggleSelected: (id) =>
    set((state) => {
      const updated = new Map(state.tvGenreMap);
      const genre = updated.get(id);
      if (genre) {
        updated.set(id, { ...genre, selected: !genre.selected });
      }
      return { tvGenreMap: updated };
    }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("useMovieGenresStore", useMovieGenresStore);
  mountStoreDevtool("useMovieGenresStore", useTvGenresStore);
}
