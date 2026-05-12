import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CustomizationStore = {
  activePalette: string;
  disableHomepageVideo: boolean;
  disableWatchList: boolean;
  disableWatchListHomepage: boolean;
  cardStyle: "vertical" | "horizontal";
  cardType: "descriptive" | "overlay";

  setAccentColor: (color: string) => void;
  toggleDisableHomepageVideo: () => void;
  toggleDisableWatchList: () => void;
  toggleDisableWatchListHomepage: () => void;
  setCardStyle: (style: "vertical" | "horizontal") => void;
  setCardType: (type: "descriptive" | "overlay") => void;
};

const useCustomizationStore = create<CustomizationStore>()(
  persist(
    (set) => ({
      activePalette: "red",
      disableHomepageVideo: true,
      disableWatchList: false,
      disableWatchListHomepage: false,
      cardStyle: "horizontal",
      cardType: "descriptive",

      setAccentColor: (color) => set({ activePalette: color }),
      setCardType: (type) => set({ cardType: type }),
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
