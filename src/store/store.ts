import { create } from "zustand";

export type Tab = "movies" | "tvshows";
type SearchTabStore = {
  currentTab: Tab;
  setCurrentTab: (tab: Tab) => void;
};
export const useSearchTabStore = create<SearchTabStore>()((set) => ({
  currentTab: "movies",
  setCurrentTab: (tab) => set(() => ({ currentTab: tab })),
}));
