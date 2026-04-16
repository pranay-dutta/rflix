import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CustomizationStore = {
  activePalette: string;
  disableHomepageVideo: boolean;
  disableWatchList: boolean;
  disableWatchListHomepage: boolean;
  cardStyle: "vertical" | "horizontal";

  setAccentColor: (color: string) => void;
  toggleDisableHomepageVideo: () => void;
  toggleDisableWatchList: () => void;
  toggleDisableWatchListHomepage: () => void;
  setCardStyle: (style: "vertical" | "horizontal") => void;
};

const useCustomizationStore = create<CustomizationStore>()(
  persist(
    (set) => ({
      activePalette: "red",
      disableHomepageVideo: true,
      disableWatchList: false,
      disableWatchListHomepage: false,
      cardStyle: "horizontal",

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
      setCardStyle: (style) => set({ cardStyle: style }),
    }),
    {
      name: "userCustomization", // localStorage key
    },
  ),
);

export default useCustomizationStore;
