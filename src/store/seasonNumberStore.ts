import { create } from "zustand";

type SeasonNumberStore = {
  currentSeason: number;
  seriesId: number | undefined;
  changeSeason: (newSeasonNumber: number) => void;
  changeSeriesId: (newSeriesId: number) => void;
};
export const useSeasonNumberStore = create<SeasonNumberStore>()((set) => ({
  currentSeason: 1,
  seriesId: undefined,

  changeSeason: (newSeasonNumber) => set({ currentSeason: newSeasonNumber }),
  changeSeriesId: (newSeriesId: number) => set({ seriesId: newSeriesId }),
}));
