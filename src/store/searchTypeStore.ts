import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

type SearchTypeStore = {
  searchType: SearchMenuValue;
  setSearchType: (type: SearchMenuValue) => void;
};

export const searchMenuItems = [
  { label: "Movies & TV Shows", value: "Movies & TV Shows" },
  { label: "Movies", value: "Movies" },
  { label: "TV Shows", value: "TV Shows" },
] as const;

export type SearchMenuValue = (typeof searchMenuItems)[number]["value"];

export const useSearchType = create<SearchTypeStore>()((set) => ({
  searchType: searchMenuItems[0].value,
  setSearchType: (type) => set(() => ({ searchType: type })),
}));

if (import.meta.env.DEV) {
  mountStoreDevtool("useSearchType", useSearchType);
}
