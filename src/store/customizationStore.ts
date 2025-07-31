import { create } from "zustand";
import { persist } from "zustand/middleware";

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

const useCustomizationStore = create<CustomizationStore>()(
  persist(
    (set) => ({
      activePalette: "purple",
      disableHomepageVideo: true,
      disableWatchList: false,
      disableWatchListHomepage: false,

      setAccentColor: (color) => set({ activePalette: color }),
      toggleDisableHomepageVideo: () =>
        set((state) => ({
          disableHomepageVideo: !state.disableHomepageVideo,
        })),
      toggleDisableWatchList: () =>
        set((state) => ({ disableWatchList: !state.disableWatchList })),
      toggleDisableWatchListHomepage: () =>
        set((state) => ({
          disableWatchListHomepage: !state.disableWatchListHomepage,
        })),
    }),
    {
      name: "userCustomization", // localStorage key
    },
  ),
);

export default useCustomizationStore;
