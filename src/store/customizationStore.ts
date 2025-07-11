import { create } from "zustand";

export type CustomizationStore = {
  activePalette: string;
  disableHomepageVideo: boolean;
  disableWatchList: boolean;
  disableWatchListHomepage: boolean;

  setAccentColor: (color: string) => void;
  toggleDisableHomepageVideo: () => void;
  toggleDisableWatchList: () => void;
  toggleDisableWatchListHomepage: () => void;
};

const useCustomizationStore = create<CustomizationStore>((set) => ({
  activePalette: "purple", // Default color
  disableHomepageVideo: false, // Default to showing video on home screen
  disableWatchList: false, // Default to showing wishlist
  disableWatchListHomepage: false,

  setAccentColor: (color: string) => set({ activePalette: color }),

  toggleDisableHomepageVideo: () =>
    set((state) => ({ disableHomepageVideo: !state.disableHomepageVideo })),

  toggleDisableWatchListHomepage: () =>
    set((state) => ({ disableWatchListHomepage: !state.disableWatchListHomepage })),

  toggleDisableWatchList: () =>
    set((state) => ({ disableWatchList: !state.disableWatchList })),
}));

export default useCustomizationStore;
