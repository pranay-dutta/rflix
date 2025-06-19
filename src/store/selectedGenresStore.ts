import { create } from "zustand";

type MovieGenreStore = {
  movieGenresSet: Set<number>;
  insertMovieGenreId: (id: number) => void;
  removeMovieGenreId: (id: number) => void;
  hasMovieGenreId: (id: number) => boolean;
};

type TvGenreStore = {
  tvGenresSet: Set<number>;
  insertTvGenreId: (id: number) => void;
  removeTvGenreId: (id: number) => void;
  hasTvGenreId: (id: number) => boolean;
};

// Global store to keep the state of selected Movie Genres
export const useSelectedMovieGenreStore = create<MovieGenreStore>((set, get) => ({
  movieGenresSet: new Set<number>(),

  insertMovieGenreId: (id: number) => {
    const newSet = new Set(get().movieGenresSet);
    newSet.add(id);
    set({ movieGenresSet: newSet });
  },

  removeMovieGenreId: (id: number) => {
    const newSet = new Set(get().movieGenresSet);
    newSet.delete(id);
    set({ movieGenresSet: newSet });
  },
  hasMovieGenreId: (id: number) => get().movieGenresSet.has(id),
}));

// Global store to keep the state of selected Tv Genres
export const useSelectedTvGenreStore = create<TvGenreStore>((set, get) => ({
  tvGenresSet: new Set<number>(),

  insertTvGenreId: (id: number) => {
    const newSet = new Set(get().tvGenresSet);
    newSet.add(id);
    set({ tvGenresSet: newSet });
  },
  removeTvGenreId: (id: number) => {
    const newSet = new Set(get().tvGenresSet);
    newSet.delete(id);
    set({ tvGenresSet: newSet });
  },
  hasTvGenreId: (id: number) => get().tvGenresSet.has(id),
}));
